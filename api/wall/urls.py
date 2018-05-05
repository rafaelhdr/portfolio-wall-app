from django.conf.urls import url
from wall import views as wall_views

urlpatterns = [
    url(r'^', wall_views.PostView.as_view()),
]
