from datetime import date

from django.db.models import Q
from django.shortcuts import render

from discount_module.models import DiscountCode
from product_module.models import Product


def product_page(request):
    return render(request, 'product_module/apple-iphone14pro.html')

