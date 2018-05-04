from auth.forms import UserForm
from django.contrib.auth import authenticate, login
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


@api_view(['POST'])
def auth_login(request):
    """
    Login existent user
    or return errors if not possible.
    """
    body_data = json.loads(request.body)
    user = authenticate(request,
                        username=body_data['username'], password=body_data['password'])
    if user is not None:
        login(request, user)
        return Response({
            'errors': None,
            'data': {
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        })
    else:
        return Response({
            'errors': [
                'Invalid username and/or password!'
            ],
        })
