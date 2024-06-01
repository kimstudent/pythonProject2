#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import subprocess

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Запуск Telegram бота в отдельном процессе
    bot_process = subprocess.Popen([sys.executable, 'start_bot.py'])

    try:
        execute_from_command_line(sys.argv)
    finally:
        # Остановка процесса бота при завершении работы Django сервера
        bot_process.terminate()

if __name__ == '__main__':
    main()
