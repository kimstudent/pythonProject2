import logging
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
from telegram.request import HTTPXRequest
from django.conf import settings
import os
import django

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')
django.setup()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text('Привет, пользователь')

async def main():
    application = Application.builder().token(settings.TOKEN).request(HTTPXRequest()).build()
    application.add_handler(CommandHandler("start", start))

    await application.initialize()
    logger.info("Starting bot webhook")
    await application.updater.start_webhook(
        listen="0.0.0.0",
        port=8443,
        url_path=settings.TOKEN,
        webhook_url=settings.WEBHOOK_URL,
    )
    await application.updater.idle()

if __name__ == '__main__':
    asyncio.run(main())
