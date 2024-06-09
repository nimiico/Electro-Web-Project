from django.shortcuts import render


def product_page(request):
    return render(request, 'product_module/apple-iphone14pro.html')
