from datetime import date

from django.forms import ImageField
from django.http import Http404, JsonResponse, HttpRequest
from django.shortcuts import render, redirect
from django.urls import reverse
from account_module.models import User
from cart_module.models import Cart, CartItem
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

from .models import Hero, Banner


def index_page(request):
    now = timezone.now()

    specific_image_prefetch = Prefetch(
        'image_set',
        queryset=Image.objects.filter(title='off-post'),
        to_attr='specific_images'
    )

    banner_products = Banner.objects.filter(is_banner=True).first()
    banner_images = Image.objects.filter(product=banner_products.product, title='banner').first()

    hero_product = Hero.objects.filter(is_hero=True).first()
    hero_images = Image.objects.filter(product=hero_product.product, title='hero').first()

    discounted_products = Product.objects.filter(
        Q(discountcode__expiry_date__gt=now) &
        Q(discountcode__discount_type='percentage') |
        Q(discountcode__discount_type='amount')
    ).annotate(
        discount_type=F('discountcode__discount_type'),
        discount_value=Coalesce(F('discountcode__discount_amount'), 0, output_field=DecimalField()),
    ).prefetch_related(specific_image_prefetch).distinct().order_by('-discountcode__discount_amount')[:2]

    context = {
        'discounted_products': discounted_products,
        'banner_products': banner_products,
        'banner_images': banner_images,
        'hero_images': hero_images,
        'hero_product': hero_product,
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
                        return render(request, 'shared/login_modal_component.html')
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
        user: User = User.objects.filter(email_active_code__exact=email_active_code).first()
        if user is not None:
            if not user.is_active:
                user.is_active = True
                user.email_active_code = get_random_string(72)
                user.save()
                return redirect(reverse('index_page'))
        raise Http404


def site_header_component(request):
    return render(request, 'shared/site_header_component.html')


def site_footer_component(request):
    return render(request, 'shared/site_footer_component.html')


def cart_modal_component(request: HttpRequest):
    if request.user.is_authenticated:
        current_cart, created = Cart.objects.prefetch_related('cartitem_set').get_or_create(is_paid=False, user_id=request.user.id)

        total_product = 0
        total_amount = 0

        for cart_detail in current_cart.cartitem_set.all():
            total_amount += cart_detail.product.price * cart_detail.count
            total_product += cart_detail.count

        context = {
            'cart': current_cart,
            'sum': total_amount,
            'total_count': total_product,
        }
        return render(request, 'shared/cart_modal_component.html', context)
    else:
        return render(request, 'shared/cart_modal_component.html')



def add_to_cart(request: HttpRequest):
    product_id = request.GET.get('product_id')
    count = request.GET.get('count')

    if request.user.is_authenticated:
        product = Product.objects.filter(id=product_id).first()
        if product is not None:

            current_cart, created = Cart.objects.get_or_create(is_paid=False, user_id=request.user.id)
            current_cart_detail = current_cart.cartitem_set.filter(product_id=product_id).first()
            if current_cart_detail is not None:
                current_cart_detail.count += int(count)
                current_cart_detail.save()

            else:
                new_detail = CartItem(cart_id=current_cart.id, product_id=product_id, count=count)
                new_detail.save()

            return JsonResponse({
                'status': 'success'
            })
        else:
            return JsonResponse({
                'status': 'not_found'
            })
    else:
        return JsonResponse({
            'status': 'not_auth'
        })


def otp_modal_component(request):
    return render(request, 'shared/otp_modal_component.html')


def success_modal_component(request):
    return render(request, 'shared/success_modal_component.html')


def log_out(request):
    if request.method == 'GET':
        logout(request)
        return redirect(reverse('index_page'))
