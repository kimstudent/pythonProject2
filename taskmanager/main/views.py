import os
import base64
import time
import cv2
from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
import socket
import json
from django.core.files.storage import FileSystemStorage

from .models import Profile, Device, Message, Video, Photo



VIDEOS_DIR = os.path.join('media', 'videos')
os.makedirs(VIDEOS_DIR, exist_ok=True)

def gallery(request):
    return render(request, 'main/gallery.html')

@csrf_exempt
def save_video(request):
    if request.method == 'POST':
        video = request.FILES['video']
        current_time = time.strftime('%Y-%m-%d_%H-%M-%S')
        unique_filename = f'video_{current_time}.webm'
        video_path = os.path.join(VIDEOS_DIR, unique_filename)
        with open(video_path, 'wb') as f:
            for chunk in video.chunks():
                f.write(chunk)
        video_url = f'/media/videos/{unique_filename}'
        return JsonResponse({'status': 'success', 'video_url': video_url, 'timestamp': current_time})
    return JsonResponse({'status': 'failed'})

def load_videos(request):
    if request.method == 'GET':
        videos = []
        if os.path.exists(VIDEOS_DIR):
            for video_name in os.listdir(VIDEOS_DIR):
                video_path = os.path.join(VIDEOS_DIR, video_name)
                timestamp = os.path.getctime(video_path)
                video_url = f'/media/videos/{video_name}'
                videos.append({'url': video_url, 'timestamp': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(timestamp))})
        return JsonResponse({'videos': videos})


@csrf_exempt
def delete_video(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        video_url = data.get('video_url')
        video_path = os.path.join('media', video_url.replace('/media/', ''))
        if os.path.exists(video_path):
            os.remove(video_path)
            return JsonResponse({'status': 'success'})
        return JsonResponse({'status': 'failed', 'error': 'Video not found'})
    return JsonResponse({'status': 'failed', 'error': 'Invalid request method'})


def index(request):
    profiles = Profile.objects.all()
    return render(request, 'main/index.html', {'profiles': profiles})



def analytics(request):
    return render(request, 'main/analytics.html')

def rules(request):
    return render(request, 'main/rules.html')

def history(request):
    return render(request, 'main/history.html')

def settings(request):
    return render(request, 'main/settings.html')



def lock(request):
    if request.method == 'POST':
        data_to_send = request.POST.get('data_to_send')
        send_data_to_esp(data_to_send)
        response_from_esp = receive_data_from_esp()
        return HttpResponse("Data sent to ESP8266: " + data_to_send + "<br>" + "Response from ESP8266: " + response_from_esp)
    return render(request, 'main/lock.html')


ESP_IP = '192.168.1.71'  # Замените на IP вашего ESP8266
ESP_PORT = 13245

@csrf_exempt
def toggle_door(request):
    if request.method == 'POST':
        send_data_to_esp('toggle')
        response_from_esp = receive_data_from_esp()
        return JsonResponse({'status': 'success', 'response': response_from_esp})
    return JsonResponse({'status': 'failed', 'error': 'Invalid request method'})

def send_data_to_esp(data):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.sendto(data.encode(), (ESP_IP, ESP_PORT))
        print("Data sent to ESP8266 successfully!")
    except Exception as e:
        print("Error while sending data:", e)
    finally:
        sock.close()

def receive_data_from_esp():
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(5)
        sock.bind(('', ESP_PORT))
        data, addr = sock.recvfrom(1024)
        return data.decode()
    except socket.timeout:
        print("Error: No response from ESP8266")
        return "No response from ESP8266"
    except Exception as e:
        print("Error while receiving data:", e)
        return "Error receiving data"
    finally:
        sock.close()

@csrf_exempt
def virus_endpoint(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        return JsonResponse({'status': 'success', 'data': data})
    return JsonResponse({'status': 'error'}, status=400)


@csrf_exempt
def start_recording(request):
    camera.start_recording()
    return JsonResponse({'status': 'started'})

@csrf_exempt
def stop_recording(request):
    camera.stop_recording()
    return JsonResponse({'status': 'stopped'})



from telegram import Bot
from telegram import Update
from telegram.ext import Application

def send_message_to_telegram(request):
    bot = Bot(token=settings.TOKEN)
    bot.send_message(chat_id='Ваш чат ID', text='Привет из Django view!')
    return HttpResponse("Сообщение отправлено!")

@csrf_exempt
def webhook_handler(request):
    if request.method == 'POST':
        try:
            # Парсим данные из запроса
            update = Update.de_json(request.body.decode('utf-8'))
            # Получаем экземпляр приложения Telegram
            application = Application.get_instance()
            # Обрабатываем обновление
            application.process_update(update)
            return JsonResponse({'status': 'ok'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    return JsonResponse({'status': 'invalid request method'})