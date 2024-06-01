# main/forms.py

from django import forms
from .models import Video, Photo

class VideoForm(forms.ModelForm):
    class Meta:
        model = Video
        fields = ['title', 'file']

class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ['title', 'file']
