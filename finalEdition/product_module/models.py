from django.db import models
from django.db import models
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    price_change_date = models.DateTimeField(default=timezone.now)
    visits = models.PositiveIntegerField(default=0)  # تعداد بازدیدها

    def __str__(self):
        return self.name

    @staticmethod
    def get_popular_products(start_date, end_date):
        """
        برگرداندن محصولات پربازدید در یک بازه زمانی دلخواه.
        """
        popular_products = Product.objects.filter(created_at__range=(start_date, end_date)).order_by('-visits')[:10]
        return popular_products


class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"Image for {self.product.name}"


class Video(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    video = models.FileField(upload_to='product_videos/')

    def __str__(self):
        return f"Video for {self.product.name}"
