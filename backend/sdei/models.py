from django.db import models

class JsonModel(models.Model):
    file = models.FileField(upload_to='json_data/')

