from rest_framework.views import APIView
from rest_framework.response import Response
from wall.forms import PostForm
import json


class PostView(APIView):
    """
    Create new post
    """

    def post(self, request, format=None):
        if not request.user.is_authenticated():
            return Response({
                'errors': ['User should be authenticated to add new post.']
            }, 403)

        form = PostForm(json.loads(request.body))
        if form.is_valid():
            form.save(author=request.user)
            return Response({
                'errors': None
            })
        else:
            return Response({
                'errors': form.errors
            })
