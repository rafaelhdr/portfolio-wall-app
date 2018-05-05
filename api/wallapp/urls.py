from django.conf.urls import url
from django.contrib import admin
from auth import views as auth_views 

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^auth/register', auth_views.auth_register)
]
