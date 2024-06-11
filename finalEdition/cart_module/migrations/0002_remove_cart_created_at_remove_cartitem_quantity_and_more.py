# Generated by Django 5.0.4 on 2024-06-11 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart_module', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='cartitem',
            name='quantity',
        ),
        migrations.AddField(
            model_name='cart',
            name='is_paid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='cart',
            name='payment_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='cartitem',
            name='count',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='cartitem',
            name='final_price',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]