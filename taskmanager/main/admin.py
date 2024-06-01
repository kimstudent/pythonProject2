# main/admin.py
from django.contrib import admin
from .models import Profile, Message, Device

admin.site.register(Profile)
admin.site.register(Device)

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'profile', 'text', 'created_at')


from .models import Image

admin.site.register(Image)