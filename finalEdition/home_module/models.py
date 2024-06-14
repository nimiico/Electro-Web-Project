from django.db import models


# Create your models here.
from product_module.models import Product


class Hero(models.Model):
    header = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    is_hero = models.BooleanField(default=False)

    def __str__(self):
        return self.product.title


class Banner(models.Model):
    header = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    is_banner = models.BooleanField(default=False)

    def __str__(self):
        return self.product.title
