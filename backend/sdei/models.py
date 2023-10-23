from django.db import models

class JsonModel(models.Model):
    file = models.FileField(upload_to='json_data/')

class EnergyUsage(models.Model):
    timestamp = models.DateTimeField()
    kwh = models.FloatField()