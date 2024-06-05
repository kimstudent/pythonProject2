# # main/management/commands/bot.py
#
# import logging
# from telegram import Update
# from telegram.ext import Application, CommandHandler, CallbackContext
# from telegram.request import HTTPXRequest
# from django.conf import settings
# from django.core.management.base import BaseCommand
# import os
# import django
# import asyncio
#
# # Настройка логирования
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)
#
# # Отключение логирования для httpx и telegram, если DEBUG=False
# if not settings.DEBUG:
#     logging.getLogger("httpx").setLevel(logging.WARNING)
#     logging.getLogger("telegram").setLevel(logging.WARNING)
#
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')
# django.setup()
#
# async def start(update: Update, context: CallbackContext) -> None:
#     logger.info("Received /start command")
#     await update.message.reply_text('Привет, пользователь')
#
# def error_handler(update: object, context: CallbackContext) -> None:
#     """Log the error and send a telegram message to notify the developer."""
#     logger.error(msg="Exception while handling an update:", exc_info=context.error)
#
# async def run_bot():
#     logger.info("Starting bot application")
#     application = Application.builder().token(settings.TOKEN).request(HTTPXRequest()).build()
#     application.add_handler(CommandHandler("start", start))
#     application.add_error_handler(error_handler)
#
#     logger.info("Starting bot polling")
#     await application.run_polling()
#
# class Command(BaseCommand):
#     help = 'Runs the Telegram bot'
#
#     def handle(self, *args, **kwargs):
#         asyncio.run(run_bot())
