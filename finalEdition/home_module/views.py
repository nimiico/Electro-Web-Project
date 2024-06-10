from datetime import date

from django.forms import ImageField
from django.http import Http404
from django.shortcuts import render, redirect
from django.urls import reverse
from account_module.models import User
from discount_module.models import DiscountCode
from product_module.models import Product, Image
from .forms import RegisterForm, LoginForm
from django.utils.crypto import get_random_string
from django.contrib.auth import login, logout
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils import timezone
from django.db.models import F, Q, DecimalField, OuterRef, Subquery, Prefetch
from django.db.models.functions import Coalesce


def index_page(request):
    now = timezone.now()

    specific_image_prefetch = Prefetch(
        'image_set',
        queryset=Image.objects.filter(title='off-post'),  # عنوان خاص تصویر
        to_attr='specific_images'
    )

    discounted_products = Product.objects.filter(
        Q(discountcode__expiry_date__gt=now) &
        Q(discountcode__discount_type='percentage') |
        Q(discountcode__discount_type='amount')
    ).annotate(
        discount_type=F('discountcode__discount_type'),
        discount_value=Coalesce(F('discountcode__discount_amount'), 0, output_field=DecimalField()),
    ).prefetch_related(specific_image_prefetch).distinct().order_by('-discountcode__discount_amount')[:2]

    for product in discounted_products:
        print(
            f'Product Name: {product.name}, Discount Type: {product.discount_type}, Discount Value: {product.discount_value}')
        if product.specific_images:
            for image in product.specific_images:
                print(f'Image URL: {image.image.url}')
        else:
            print('No specific image found')
    context = {
        'discounted_products': discounted_products
    }

    return render(request, 'home_module/index_page.html', context)


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
