from django.test import Client, TestCase
from django.contrib.auth.models import User
import json


class AuthTestCase(TestCase):

    def setUp(self):
        self.c = Client()

    def test_user_registered_successfully(self):
        """
        User is registered if requested with correct parameters.
        """
        response = self.c.post('/auth/register',
                               json.dumps({'username': 'george',
                                           'password': 'password',
                                           'first_name': 'George',
                                           'last_name': 'Orwell',
                                           'email': 'george@orwell.com',
                                           }),
                               content_type="application/json")
        assert 200 == response.status_code
        assert None == response.json()['errors']

        user = User.objects.get(username='george')
        assert user is not None

    def test_do_not_insert_duplicated_users(self):
        """
        Users with the same username cannot be inserted.
        """
        User.objects.create_user('george', 'george@orwell.com', 'password')

        response = self.c.post('/auth/register',
                               json.dumps({'username': 'george',
                                           'password': 'password',
                                           'first_name': 'George',
                                           'last_name': 'Orwell',
                                           'email': 'george@orwell.com',
                                           }),
                               content_type="application/json")
        assert 200 == response.status_code
        assert 'A user with that username already exists.' == response.json()['errors']['username'][0]
