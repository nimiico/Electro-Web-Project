# Generated by Django 5.0.4 on 2024-06-11 02:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product_module', '0007_product_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='depth',
            field=models.PositiveIntegerField(default=0),
        ),
    ]