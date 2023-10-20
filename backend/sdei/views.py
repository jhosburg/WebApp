# api/views.py

from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .forms import JSONUploadForm
import json
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import JsonModel
from .models import EnergyUsage
from .utilities import calculate_energy_cost
from .serializers import JsonModelSerializer

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

def grab_json(request):
    file_path = 'media/json_data/output.json'
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)
    
    return JsonResponse(data, safe=False)

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



