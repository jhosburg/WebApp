# serializers.py
from rest_framework import serializers
from .models import JsonModel

class JsonModelSerializer(serializers.Serializer):
    file = serializers.FileField()

    def create(self, validated_data):
        return JsonModel.objects.create(file=validated_data['file'])


