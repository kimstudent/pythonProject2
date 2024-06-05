# # main/tasks.py
#
# from celery import shared_task
# import logging
# from telegram import Update
# from telegram.ext import Application, CommandHandler, CallbackContext
# from telegram.request import HTTPXRequest
# from django.conf import settings
# import asyncio
#
# logger = logging.getLogger(__name__)
#
#
# @shared_task
# def start_bot():
#     async def run():
#         logger.info("Starting bot application")
#         application = Application.builder().token(settings.TOKEN).request(HTTPXRequest()).build()
#         application.add_handler(CommandHandler("start", start))
#         application.add_error_handler(error_handler)
#
#         logger.info("Starting bot polling")
#         await application.run_polling()
#
#     asyncio.run(run())
#
#
# async def start(update: Update, context: CallbackContext) -> None:
#     logger.info("Received /start command")
#     await update.message.reply_text('Привет, пользователь')
#
#
# def error_handler(update: object, context: CallbackContext) -> None:
#     logger.error(msg="Exception while handling an update:", exc_info=context.error)
