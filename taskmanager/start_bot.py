
from django.core.management.base import BaseCommand
import threading
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
from django.conf import settings
from telegram.request import HTTPXRequest

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text('Привет, пользователь')

async def run_bot():
    application = Application.builder().token(settings.TOKEN).request(HTTPXRequest()).build()
    application.add_handler(CommandHandler("start", start))
    await application.run_polling()

def run():
    asyncio.run(run_bot())

class Command(BaseCommand):
    help = 'Запуск Telegram бота'

    def handle(self, *args, **options):
        bot_thread = threading.Thread(target=run)
        bot_thread.daemon = True
        bot_thread.start()
