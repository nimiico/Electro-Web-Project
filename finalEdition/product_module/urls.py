from django.urls import path
from . import views

urlpatterns = [
    path('product-page', views.product_page, name='product-page'),
]