# Generated by Django 5.0.3 on 2024-05-29 20:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_photo_delete_image_remove_video_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='photo',
            old_name='created_at',
            new_name='uploaded_at',
        ),
        migrations.RenameField(
            model_name='video',
            old_name='created_at',
            new_name='uploaded_at',
        ),
    ]
