
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
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, UserProfileSerializer
from rest_framework import permissions
from .validations import custom_validation, validate_email, validate_password, validate_username

from django.shortcuts import get_object_or_404

from django.http import JsonResponse



class ProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = ProfileViewSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
     

#################################

# class UserProfile(APIView):
# 	permission_classes = (permissions.AllowAny,)
# 	authentication_classes = (SessionAuthentication,)
# 	##
# 	def get(self, request):
# 		data = request.data
# 		assert validate_username(data)
# 		serializer = UserProfileSerializer(data=data)
# 		if serializer.is_valid(raise_exception=True):
# 			user = serializer.check_user(data)
# 			return Response(serializer.data, status=status.HTTP_200_OK)


class UserProfile(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        data = request.data
        # assert validate_username(data)
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            user_data = {'username': user.username}  # Add more fields as needed
            return Response(user_data, status=status.HTTP_200_OK)
          
#############################
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

def grab_json(request, filename):
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

def calculate_energy_usage_cost(request):
    if request.method == 'POST':
        file_path = 'media/json_data/output.json'
        with open(file_path, 'r') as json_file:
            data = request.POST.get('json_file')
        data = json.loads(json_file)
        total_cost = 0

        for entry in data:
            timestamp = entry['timestamp']  # Convert to datetime
            kwh = entry['kwh']
            cost = calculate_energy_cost(timestamp, kwh)
            total_cost += cost

        return JsonResponse({'total_cost': total_cost})
    return JsonResponse({'error': 'Invalid request'})


def file_list(request):
    media_root = settings.MEDIA_ROOT
    json_data_dir = os.path.join(media_root, 'json_data')

    # List files within the 'json_data' subdirectory
    files = [file for file in os.listdir(json_data_dir) if os.path.isfile(os.path.join(json_data_dir, file))]

    return JsonResponse(files, safe=False)