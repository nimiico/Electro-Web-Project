from datetime import date

from django.db.models import Q
from django.http import Http404
from django.shortcuts import render, redirect
from django.urls import reverse
from account_module.models import User
from discount_module.models import DiscountCode
from product_module.models import Product
from .forms import RegisterForm, LoginForm
from django.utils.crypto import get_random_string
from django.contrib.auth import login, logout
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils import timezone


def index_page(request):
    # today = timezone.now()
    #
    # discounted_products_by_product = Product.objects.filter(
    #     Q(discountcode__valid_from__lte=today) &
    #     Q(discountcode__valid_to__gte=today) &
    #     Q(discountcode__applicable=today) &
    # )

    # print("Is discount code exists:", discount_code_exists)
    # print("Number of discounted products:", number_of_discounted_products)

    return render(request, 'home_module/index_page.html', )


def signup_modal_component(request):
    if request.method == 'POST':
        register_form = RegisterForm(request.POST)
        if register_form.is_valid():
            user_email = register_form.cleaned_data.get('email')
            user_password = register_form.cleaned_data.get('password')
            user_name = register_form.cleaned_data.get('username')
            user: bool = User.objects.filter(email__iexact=user_email).exists()
            if user:
                register_form.add_error('email', 'The entered Email is duplicate.')
            else:
                new_user = User(email=user_email, username=user_name, email_active_code=get_random_string(72),
                                is_active=False)
                new_user.set_password(user_password)
                new_user.save()
                subject = 'activate account'
                sender = 'dmailtrap@demomailtrap.com'
                to = [new_user.email]
                context = {'user': new_user}
                html_message = render_to_string('emails/activate_account.html', context)
                plain_message = strip_tags(html_message)
                email = EmailMultiAlternatives(subject, plain_message, sender, to)
                email.attach_alternative(html_message, "text/html")
                email.send()
                # send_email('activate account', new_user.email, {'user': new_user}, 'emails/activate_account.html')
                return redirect(reverse('index_page'))

        context = {
            'register_form': register_form
        }
        return render(request, 'shared/signup_modal_component.html', context)

    if request.method == 'GET':
        register_form = RegisterForm()
        context = {
            'register_form': register_form
        }
        return render(request, 'shared/signup_modal_component.html', context)


def login_modal_component(request):
    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            user_email = login_form.cleaned_data.get('email')
            user_pass = login_form.cleaned_data.get('password')
            user: User = User.objects.filter(email__iexact=user_email).first()
            if user is not None:
                if not user.is_active:
                    login_form.add_error('email', 'your account is not active!')

                else:
                    is_password_correct = user.check_password(user_pass)
                    if is_password_correct:
                        login(request, user)
                        return redirect(reverse('index_page'))
                    else:
                        login_form.add_error('email', 'user not founded')
            else:
                login_form.add_error('email', 'user not founded')

        context = {
            'login_form': login_form
        }
        return render(request, 'shared/login_modal_component.html', context)

    if request.method == 'GET':
        login_form = LoginForm()
        context = {
            'login_form': login_form
        }
        return render(request, 'shared/login_modal_component.html', context)


def activate_account_view(request, email_active_code):
    if request.method == 'GET':
        user: User = User.objects.filter(email_active_code__iexact=email_active_code).first()
        if user is not None:
            if not user.is_active:
                user.is_active = True
                user.email_active_code = get_random_string(72)
                user.save()
                return redirect(reverse('index_page'))
            else:
                pass

        raise Http404


# def signup_modal_component(request):
#     if request.method == 'POST':
#         register_form = RegisterForm(request.POST)
#         if register_form.is_valid():
#             print(register_form.cleaned_data)
#             return redirect('index_page')
#
#     else:
#         register_form = RegisterForm()
#     context = {
#         'register_form': register_form
#     }
#     return render(request, 'shared/signup_modal_component.html', context)


def site_header_component(request):
    return render(request, 'shared/site_header_component.html')


def site_footer_component(request):
    return render(request, 'shared/site_footer_component.html')


def cart_modal_component(request):
    return render(request, 'shared/cart_modal_component.html')


def otp_modal_component(request):
    return render(request, 'shared/otp_modal_component.html')


def success_modal_component(request):
    return render(request, 'shared/success_modal_component.html')


def log_out(request):
    if request.method == 'GET':
        logout(request)
        return redirect(reverse('index_page'))

#
# def off_products(request):
#     print(22)
#     active_discount_codes = DiscountCode.objects.filter(expiry_date__gte=date.today())
#
#     discounted_products = Product.objects.filter(
#         Q(discountcode__in=active_discount_codes)
#     ).distinct()
#
#     return render(request, 'home_module/index_page.html', {'discounted_products': discounted_products})
