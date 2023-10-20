# api/urls.py

from django.urls import path
from . import views
from .views import UploadJsonView


urlpatterns = [
    path('hello/', views.api_hello, name='api_hello'),
    path('json_upload/', UploadJsonView.as_view(), name="json_upload"),
    path('grabJson/', views.grab_json, name='grabJson'),
]


