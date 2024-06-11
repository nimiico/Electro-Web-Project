from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    depth = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.parent:
            self.depth = self.parent.depth + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    title = models.CharField(max_length=200, null=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.BooleanField(default=False)
    brand = models.CharField(default="", max_length=200)
    item_height = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    item_width = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    screen_size = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    model_number = models.CharField(default="", max_length=200)
    ram = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    operating_system = models.CharField(default="", max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    price_change_date = models.DateTimeField(default=timezone.now)
    visits = models.PositiveIntegerField(default=0)
    slug = models.SlugField(default="", null=False, db_index=True)
    is_banner = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse('product-page', args=[self.slug])

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    @staticmethod
    def get_popular_products(start_date, end_date):
        popular_products = Product.objects.filter(created_at__range=(start_date, end_date)).order_by('-visits')[:10]
        return popular_products


class Image(models.Model):
    title = models.CharField(max_length=200, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/product_gallery')

    def __str__(self):
        return f"Image for {self.product.name}"


class Video(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    video = models.FileField(upload_to='product_videos/')

    def __str__(self):
        return f"Video for {self.product.name}"