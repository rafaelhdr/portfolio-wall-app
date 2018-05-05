from auth.forms import UserForm
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

@api_view(['POST'])
def auth_register(request):
    """
    Register new user
    or return errors if not possible.
    """
    form = UserForm(json.loads(request.body))
    if form.is_valid():
        form.save()
        return Response({
            'errors': None
        })
    else:
        return Response({
            'errors': form.errors
        })
