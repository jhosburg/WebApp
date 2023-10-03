# api/views.py

from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .forms import JSONUploadForm
import json
from django.middleware.csrf import get_token


def api_hello(request):
    data = {'message': 'This is where a graph will be!\n Also this message verifies API is working!\n We are also able to upload files.'}
    return JsonResponse(data)

@csrf_exempt
def Json_Upload(request):
    if request.method == 'POST':
        form = JSONUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'success', 'message': 'File uploaded successfully'})  
        else:
            return JsonResponse({'status': 'success', 'message': 'Invalid File'})
    else:
        form = JSONUploadForm()
    return JsonResponse({'status': 'error', 'message': 'not allowed'})

def grab_json(request):
    file_path = 'media/json_data/output.json'
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)
    
    return JsonResponse(data, safe=False)





