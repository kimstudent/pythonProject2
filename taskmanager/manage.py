import os
import sys
from multiprocessing import Process
import asyncio

# def start_bot():
#     from start_bot import main as bot_main
#     asyncio.run(bot_main())

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

    # bot_process = Process(target=start_bot)
    # bot_process.start()

    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
