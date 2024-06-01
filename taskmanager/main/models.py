from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.user.username if self.user else "No user"

class Message(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self.id} from {self.profile.user.username if self.profile.user else 'No user'}"

class Device(models.Model):
    DEVICE_TYPES = (
        ('sensor', 'Sensor'),
        ('camera', 'Camera'),
        ('blind', 'Blind'),
        ('lock', 'Lock'),
    )

    name = models.CharField(max_length=100)
    device_type = models.CharField(max_length=10, choices=DEVICE_TYPES)
    status = models.CharField(max_length=100, default='off')

    def __str__(self):
        return self.name

class Video(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='videos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Photo(models.Model):
    title = models.CharField(max_length=100)
    file = models.ImageField(upload_to='photos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
    image = models.ImageField()

    def __str__(self):
        return str(self.image)



