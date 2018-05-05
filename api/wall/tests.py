from django.test import Client, TestCase
from django.contrib.auth.models import User
from wall.models import Post
import json


class WallTestCase(TestCase):

    def setUp(self):
        self.c = Client()

    def test_add_new_post_to_wall(self):
        """
        Logged user can add new post to wall
        """
        User.objects.create_user('george', 'george@orwell.com', 'password')
        self.c.login(username='george', password='password')

        response = self.c.post('/wall/',
                               json.dumps(
                                   {'message': 'I am the message :)', }),
                               content_type="application/json")
        assert 200 == response.status_code
        assert None == response.json()['errors']

        post = Post.objects.get(id=1)
        assert 'I am the message :)' == post.message
        assert self.c.session['_auth_user_id'] == str(post.author.id)

    def test_guest_not_logged_cant_post(self):
        """
        Only logged user can add post
        """
        response = self.c.post('/wall/',
                               json.dumps(
                                   {'message': 'I am the message :)', }),
                               content_type="application/json")
        assert 403 == response.status_code
        assert 'User should be authenticated to add new post.' == response.json()['errors'][0]

        assert 0 == Post.objects.count()
