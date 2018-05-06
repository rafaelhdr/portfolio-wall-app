from django.contrib.auth.models import User
from django.db import models


class Post(models.Model):
    message = models.CharField(max_length=500)
    author = models.ForeignKey(User)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)
