# Generated by Django 2.1.7 on 2019-09-11 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product_app', '0009_auto_20190409_1106'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='slug',
            field=models.SlugField(blank=True, unique=True),
        ),
    ]
