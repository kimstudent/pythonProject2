# main/__init__.py
default_app_config = 'main.apps.MainConfig'
from __future__ import absolute_import, unicode_literals

# Это обеспечит запуск celery при запуске Django
from .celery import app as celery_app

__all__ = ('celery_app',)