from django.db import models
from product_module.models import Product, Category


class DiscountCode(models.Model):
    DISCOUNT_TYPES = (
        ('percentage', 'درصدی'),
        ('amount', 'مبلغی'),
    )
    code = models.CharField(max_length=20, unique=True)
    discount_type = models.CharField(max_length=10, choices=DISCOUNT_TYPES)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2)
    max_percentage_discount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    max_amount_discount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    expiry_date = models.DateField()
    products = models.ManyToManyField(Product, blank=True)
    categories = models.ManyToManyField(Category, blank=True)

    def __str__(self):
        return self.code

