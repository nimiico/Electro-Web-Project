from django.urls import path
from . import views

urlpatterns = [
    path('<slug:slug>', views.product_page, name='product-page'),
]