from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_page, name='index_page'),
    path('signup/', views.signup_modal_component, name='signup_modal_component'),
    path('login/', views.login_modal_component, name='login_modal_component'),
    path('logout/', views.log_out, name='log_out'),
    path('activate-account/<email_active_code>', views.activate_account_view, name='activate_account'),
    path('add-to-cart/', views.add_to_cart, name='add_product_to_cart'),
]