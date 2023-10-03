# Generated by Django 4.1.3 on 2023-09-29 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sdei', '0002_remove_excel_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='JsonModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='json_data/')),
            ],
        ),
        migrations.DeleteModel(
            name='Excel',
        ),
    ]