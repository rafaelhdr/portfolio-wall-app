from auth.forms import UserForm
from django.contrib.auth import login
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

@api_view(['POST'])
def auth_register(request):
    """
    Register new user and make login
    or return errors if not possible.
    """
    form = UserForm(json.loads(request.body))
    if form.is_valid():
        user = form.save()
        login(request, user)
        return Response({
            'errors': None
        })
    else:
        return Response({
            'errors': form.errors
        })
