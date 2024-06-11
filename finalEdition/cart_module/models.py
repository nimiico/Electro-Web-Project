from django.db import models
from account_module.models import User
from product_module.models import Product


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_paid = models.BooleanField(default=False)
    payment_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return str(self.user)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    final_price = models.IntegerField(null=True, blank=True)
    count = models.IntegerField(default=1)

    def __str__(self):
        return str(self.cart)
