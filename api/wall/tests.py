from django.test import Client, TestCase
from django.contrib.auth.models import User
from wall.models import Post
import json


class WallTestCase(TestCase):

    def setUp(self):
        self.c = Client()

    def create_new_user(self):
        User.objects.create_user('george', 'george@orwell.com', 'password')

    def create_new_posts(self):
        author = User.objects.get(id=1)

        post = Post(message='War is peace. Freedom is slavery. Ignorance is strength.',
                    author=author)
        post.save()
        post = Post(message='All animals are equal, but some animals are more equal than others.',
                    author=author)
        post.save()

    def test_add_new_post_to_wall(self):
        """
        Logged user can add new post to wall
        """
        self.create_new_user()
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

    def test_return_list_of_posts(self):
        """
        Every user can see the list of posts
        """
        self.create_new_user()
        self.create_new_posts()
        response = self.c.get('/wall/',
                              content_type="application/json")

        assert 200 == response.status_code
        assert 2 == len(response.json()['data']['posts'])
        assert response.json()['data']['posts'][0]['message'].startswith('All animals are equal')
        assert response.json()['data']['posts'][1]['message'].startswith('War is peace')
