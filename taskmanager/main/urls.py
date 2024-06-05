from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('analytics/', views.analytics, name='analytics'),
    path('rules/', views.rules, name='rules'),
    path('gallery/', views.gallery, name='gallery'),
    path('history/', views.history, name='history'),
    path('settings/', views.settings, name='settings'),
    path('start_recording/', views.start_recording, name='start_recording'),
    path('stop_recording/', views.stop_recording, name='stop_recording'),
    path('save_video/', views.save_video, name='save_video'),
    path('load_videos/', views.load_videos, name='load_videos'),
    path('delete_video/', views.delete_video, name='delete_video'),
    path('webhook', views.webhook_handler, name='webhook_handler'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)