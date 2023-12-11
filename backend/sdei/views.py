
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .forms import JSONUploadForm
import json
import os
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import JsonModel
from .models import EnergyUsage
from .utilities import calculate_energy_cost
from .serializers import JsonModelSerializer
from django.http import JsonResponse
import pandas as pd
from django.conf import settings
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions
from .validations import custom_validation, validate_email, validate_password
from datetime import datetime, timedelta
import logging

logging.basicConfig(level=logging.DEBUG)

# from django.views.decorators.csrf import csrf_exempt


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)

# @csrf_exempt
class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        print("UserLogout view called")
        logout(request)
        print("User logged out")
        return Response(status=status.HTTP_200_OK)



class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

############


def api_hello(request):
    data = {'message': 'This is where a graph will be!\n Also this message verifies API is working!\n We are also able to upload files.'}
    return JsonResponse(data)

class UploadJsonView(APIView):
    authentication_classes = ()
    permission_classes = ()
    def post(self, request, format=None):
        serializer = JsonModelSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


def moving_average_fill(data, window_size=5):
    filled_data = []

    for i, item in enumerate(data):
        filled_item = item.copy()

        for key, value in item.items():
            if value is None or value == 0:
                start_idx = max(0, i - window_size + 1)
                end_idx = i + 1
                recent_values = [data[j][key] for j in range(start_idx, end_idx) if data[j][key] is not None and data[j][key] != 0]
                if recent_values:
                    filled_item[key] = sum(recent_values) / len(recent_values)
                else:
                    filled_item[key] = 0  # You can change 0 to any other default value

        filled_data.append(filled_item)

    return filled_data

def grab_json(request, filename, period):
    json_dir = 'media/json_data/'
    file_path = os.path.join(json_dir, filename)

    if os.path.exists(file_path):
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            data = moving_average_fill(data)

        new_date_column = None
        for key in data[0]:
            if key and not new_date_column:
                sample_value = data[0][key]
                if sample_value and isinstance(sample_value, str):
                    try:
                        datetime.strptime(sample_value, '%Y-%m-%d %H:%M:%S')
                        new_date_column = key
                    except ValueError:
                        pass

        if not new_date_column:
            return JsonResponse({'error': 'No date column found in the data.'}, status=400)

        date_column = new_date_column
        start_date = datetime.strptime(data[0][date_column], '%Y-%m-%d %H:%M:%S')

        if period == '24h':
            end_date = start_date + timedelta(hours=24)
        elif period == '1m':
            end_date = start_date.replace(day=1, month=start_date.month + 1, hour=0, minute=0, second=0) - timedelta(seconds=1)
        elif period == '1y':
            end_date = start_date + timedelta(days=365)

        filtered_data = [entry for entry in data if start_date <= datetime.strptime(entry[date_column], '%Y-%m-%d %H:%M:%S') <= end_date]
        time_increment = datetime.strptime(filtered_data[1][date_column], '%Y-%m-%d %H:%M:%S') - \
                         datetime.strptime(filtered_data[0][date_column], '%Y-%m-%d %H:%M:%S')
        is_15_minute_increment = time_increment == timedelta(minutes=15)
        new_hourly_data = {}
        for entry in filtered_data:
            entry_date = datetime.strptime(entry[date_column], '%Y-%m-%d %H:%M:%S')
            if period == '24h':
                time_key = f'{entry_date.hour}:00'
            elif period == '1m':
                time_key = entry_date.strftime('%Y-%m-%d')
            elif period == '1y':
                time_key = entry_date.strftime('%Y-%m')

            if time_key not in new_hourly_data:
                new_hourly_data[time_key] = {
                    'totalUsage': 0,
                    'BatUsage': 0,
                    'Charge': 0,
                    'DisCharge': 0,
                    'count': 0,
                }

            new_hourly_data[time_key]['totalUsage'] += calculate_total_usage(entry, is_15_minute_increment, date_column)
            new_hourly_data[time_key]['BatUsage'] += entry.get('net', 0) * 0.25
            new_hourly_data[time_key]['Charge'] += entry.get('charge', 0) * 0.25
            new_hourly_data[time_key]['DisCharge'] += entry.get('discharge', 0) * 0.25
            new_hourly_data[time_key]['count'] += 1



        total_usage_sum = sum(new_hourly_data[time_key]['totalUsage'] for time_key in new_hourly_data)

        return JsonResponse({
            'hourlyData': new_hourly_data,
            'jsonData': data,
            'totalUsageSum': total_usage_sum,
            'is15MinuteIncrement': is_15_minute_increment,
        })

    else:
        return JsonResponse({'error': 'File not found.'}, status=404)



def file_list(request):
    media_root = settings.MEDIA_ROOT
    json_data_dir = os.path.join(media_root, 'json_data')

    # List files within the 'json_data' subdirectory
    files = [file for file in os.listdir(json_data_dir) if os.path.isfile(os.path.join(json_data_dir, file))]

    return JsonResponse(files, safe=False)



def calculate_total_usage(entry, is_15_minute_increment, date_column):
    if 'grid' in entry and entry['grid'] is not None:
        return entry['grid'] * 0.25 if is_15_minute_increment else entry['grid']
    elif 'grid' in entry and 'net' in entry and entry['grid'] is not None:
        return entry['grid'] * 0.25 if is_15_minute_increment else entry['grid']
    else:
        total = sum(value for key, value in entry.items() if key != date_column and key != 'grid' and key != 'solar' and not isinstance(value, (str, bool)) and value is not None)

        return total * 0.25 if is_15_minute_increment else total
    
def SelectionChart(request, filename):
    # Define the directory where your JSON files are stored.
    json_dir = 'media/json_data/'

    # Check if the specified file exists in the directory.
    file_path = os.path.join(json_dir, filename)

    if os.path.exists(file_path):
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            data = moving_average_fill(data)
        return JsonResponse(data, safe=False)
    else:
        # Handle the case where the specified file does not exist.
        return JsonResponse({'error': 'File not found'}, status=404)
    
def calculate_total_cost(entry, is_15_minute_increment, date_column):
    if 'cost_before' in entry:
        return entry['cost_before']
    elif 'grid' in entry:
        return (entry['grid'] * 0.25) * 0.43  # Convert grid (kW) to kWh for each 15-minute interval
    else:
        total_no_grid = sum(value for key, value in entry.items() if key != date_column and key not in ['grid', 'solar'] and not isinstance(value, str))
        return (total_no_grid * 0.25) * 0.43  # Convert total (kW) to kWh for each 15-minute interval

def calculate_total_after(entry, is_15_minute_increment, date_column):
    if 'cost_after' in entry:
        return entry['cost_after']


def grab_cost_data(request, filename, period):
    json_dir = 'media/json_data/'
    file_path = os.path.join(json_dir, filename)

    if os.path.exists(file_path):
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)

        new_date_column = None
        for key in data[0]:
            if key and not new_date_column:
                sample_value = data[0][key]
                if sample_value and isinstance(sample_value, str):
                    try:
                        datetime.strptime(sample_value, '%Y-%m-%d %H:%M:%S')
                        new_date_column = key
                    except ValueError:
                        pass

        if not new_date_column:
            return JsonResponse({'error': 'No date column found in the data.'}, status=400)

        date_column = new_date_column
        start_date = datetime.strptime(data[0][date_column], '%Y-%m-%d %H:%M:%S')

        if period == '1m':
            end_date = start_date.replace(day=1, month=start_date.month + 1, hour=0, minute=0, second=0) - timedelta(seconds=1)
        elif period == '1y':
            end_date = start_date + timedelta(days=365)

        filtered_data = [entry for entry in data if start_date <= datetime.strptime(entry[date_column], '%Y-%m-%d %H:%M:%S') <= end_date]
        time_increment = datetime.strptime(filtered_data[1][date_column], '%Y-%m-%d %H:%M:%S') - \
                         datetime.strptime(filtered_data[0][date_column], '%Y-%m-%d %H:%M:%S')
        is_15_minute_increment = time_increment == timedelta(minutes=15)
        new_daily_data = {}
        new_monthly_data = {}
        total_cost_before_sum_month = 0
        total_cost_after_sum_month = 0
        total_cost_before_sum_year = 0
        total_cost_after_sum_year = 0

        for entry in filtered_data:
            entry_date = datetime.strptime(entry[date_column], '%Y-%m-%d %H:%M:%S')
            day_key = entry_date.strftime('%Y-%m-%d')  # Move this line outside of the '1m' condition

            if period == '1m':
                month_key = entry_date.strftime('%Y-%m')
            elif period == '1y':
                month_key = entry_date.strftime('%Y-%m')

            if day_key not in new_daily_data:
                new_daily_data[day_key] = {
                    'totalCostBefore': 0,
                    'totalCostAfter': 0,
                    'count': 0,
                }

            if month_key not in new_monthly_data:
                new_monthly_data[month_key] = {
                    'totalCostBefore': 0,
                    'totalCostAfter': 0,
                    'count': 0,
                }

            total_cost_before = calculate_total_cost(entry, is_15_minute_increment, date_column)
            
            # Use the get method to get 'total_cost_after' with a default value of 0 if it doesn't exist
            total_cost_after = calculate_total_after(entry, is_15_minute_increment, date_column) or 0

            new_daily_data[day_key]['totalCostBefore'] += total_cost_before
            new_daily_data[day_key]['totalCostAfter'] += total_cost_after
            new_daily_data[day_key]['count'] += 1

            new_monthly_data[month_key]['totalCostBefore'] += total_cost_before
            new_monthly_data[month_key]['totalCostAfter'] += total_cost_after
            new_monthly_data[month_key]['count'] += 1

            total_cost_before_sum_month += total_cost_before
            total_cost_after_sum_month += total_cost_after
            total_cost_before_sum_year += total_cost_before
            total_cost_after_sum_year += total_cost_after

        return JsonResponse({
            'dailyCostData': new_daily_data,
            'monthlyCostData': new_monthly_data,
            'totalCostBeforeSumMonth': total_cost_before_sum_month,
            'totalCostAfterSumMonth': total_cost_after_sum_month,
            'totalCostBeforeSumYear': total_cost_before_sum_year,
            'totalCostAfterSumYear': total_cost_after_sum_year,
            'is15MinuteIncrement': is_15_minute_increment,
        })

    else:
        return JsonResponse({'error': 'File not found.'}, status=404)

        



