# api/urls.py

from django.urls import path
from . import views
from .views import UploadJsonView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('hello/', views.api_hello, name='api_hello'),
    path('json_upload/', UploadJsonView.as_view(), name="json_upload"),
    path('grabJson/<str:filename>/', views.grab_json, name='grabJson'),
    path('file_list/', views.file_list, name='file_list'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

