from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django import forms
from django.core import validators


class RegisterForm(forms.Form):
    username = forms.CharField(
        label='username',
        max_length=50,
        error_messages={
            'required': 'please enter your username!',
            'max_length': 'username must be lower than 50 character'
        },
        widget=forms.TextInput(attrs={
            'placeholder': 'Kristin Watson',
            'class': 'form-control'
        }),
    )
    email = forms.EmailField(
        label='email',
        widget=forms.EmailInput(attrs={
            'placeholder': 'kristin.watson@example.com',
            'class': 'form-control'}),
        validators=[
            validators.MaxLengthValidator(100),
            validators.EmailValidator,
        ],
    )
    password = forms.CharField(
        label='password',
        widget=forms.PasswordInput(attrs={
            'placeholder': '••••••••••••••••••',
            'class': 'form-control'
        }),
        validators=[
            validators.MaxLengthValidator(100),
        ],

    )
    agree = forms.BooleanField(required=True, label="I agree to the Terms & Conditions")


class LoginForm(forms.Form):
    email = forms.EmailField(
        label='email',
        widget=forms.EmailInput(attrs={
            'placeholder': 'kristin.watson@example.com',
            'class': 'form-control'}),
        validators=[
            validators.MaxLengthValidator(100),
            validators.EmailValidator,
        ],
    )
    password = forms.CharField(
        label='password',
        widget=forms.PasswordInput(attrs={
            'placeholder': '••••••••••••••••••',
            'class': 'form-control'
        }),
        validators=[
            validators.MaxLengthValidator(100),
        ],

    )
    remember_me = forms.BooleanField(label='Remember Me')
