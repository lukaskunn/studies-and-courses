# Generated by Django 4.2.3 on 2023-08-02 00:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('galeria', '0006_alter_fotografia_data_alter_fotografia_foto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fotografia',
            name='data',
            field=models.DateTimeField(default=datetime.datetime(2023, 8, 1, 21, 42, 32, 66228)),
        ),
    ]
