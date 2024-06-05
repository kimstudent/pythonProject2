# import logging
# from telegram import Update
# from telegram.ext import Application, CommandHandler, CallbackContext
# from telegram.request import HTTPXRequest
# from django.conf import settings
# import os
# import django
# import asyncio
#
# # Настройка логирования
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)
#
# # Отключение логирования для httpx
# httpx_logger = logging.getLogger("httpx")
# httpx_logger.setLevel(logging.WARNING)
#
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')
# django.setup()
#
# async def start(update: Update, context: CallbackContext) -> None:
#     logger.info("Received /start command")
#     await update.message.reply_text('Привет, пользователь')
#
# async def run_polling(application):
#     logger.info("Starting bot polling")
#     await application.initialize()
#     await application.start()
#     await application.updater.start_polling()
#
#     try:
#         await asyncio.Event().wait()  # Ждем, пока приложение работает
#     finally:
#         await application.stop()  # Останавливаем приложение корректно
#
# def error_handler(update: object, context: CallbackContext) -> None:
#     """Log the error and send a telegram message to notify the developer."""
#     logger.error(msg="Exception while handling an update:", exc_info=context.error)
#
# async def main():
#     logger.info("Starting bot application")
#     application = Application.builder().token(settings.TOKEN).request(HTTPXRequest()).build()
#     application.add_handler(CommandHandler("start", start))
#     application.add_error_handler(error_handler)
#
#     await run_polling(application)
#
# if __name__ == '__main__':
#     asyncio.run(main())
