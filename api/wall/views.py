from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from wall.forms import PostForm
from wall.models import Post


class PostSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    message = serializers.CharField(required=True)
    author_id = serializers.IntegerField(source='author.id')
    author_name = serializers.CharField(source='author.get_full_name')
    created_at = serializers.DateTimeField()


class PostView(APIView):
    """
    GET - list of posts
    POST - Create new post
    """

    def get(self, request, format=None):

        posts = Post.objects.all().order_by('-created_at')
        posts_list = map(lambda p: PostSerializer(p).data, posts)

        return Response({
            'errors': None,
            'data': {
                'posts': posts_list,
            }
        })

    def post(self, request, format=None):

        if not request.user.is_authenticated():
            return Response({
                'errors': ['User should be authenticated to add new post.']
            }, 403)

        form = PostForm(request.data)
        if form.is_valid():
            form.save(author=request.user)
            return Response({
                'errors': None
            })
        else:
            return Response({
                'errors': form.errors
            })
