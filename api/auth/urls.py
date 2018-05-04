from django.conf.urls import url
from auth import views as auth_views

urlpatterns = [
    url(r'^register', auth_views.auth_register),
    url(r'^login', auth_views.auth_login),
]
