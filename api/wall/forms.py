from django.forms import ModelForm
from wall.models import Post


class PostForm(ModelForm):

    class Meta:
        model = Post
        fields = ['message']

    def save(self, author):
        post = super().save(commit=False)
        post.author = author
        post.save()
        return post
