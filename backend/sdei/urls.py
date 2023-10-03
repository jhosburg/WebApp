# api/urls.py

from django.urls import path
from . import views


urlpatterns = [
    path('hello/', views.api_hello, name='api_hello'),
    path('json_upload/', views.Json_Upload, name="json_upload"),
    path('grabJson/', views.grab_json, name='grabJson'),
]


