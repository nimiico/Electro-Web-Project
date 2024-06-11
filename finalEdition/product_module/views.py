from datetime import date

from django.db.models import Q
from django.shortcuts import render, get_object_or_404

from discount_module.models import DiscountCode
from product_module.models import Product, Image


def product_page(request, slug):
    product = get_object_or_404(Product, slug=slug)
    product_images = Image.objects.filter(product=product, title='gallery').first()
    context = {
        'product': product,
        'product_images': product_images,
        'repeat_times': range(4),
    }
    return render(request, 'product_module/product-page.html', context)

