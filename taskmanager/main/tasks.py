# main/tasks.py
import asyncio
from background_task import background
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

@background(schedule=1)
def start_bot_task():
    asyncio.run(run_bot())
