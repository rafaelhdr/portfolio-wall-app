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

    def test_login_successful(self):
        """
        Users can login successfully.
        """
        User.objects.create_user('george', 'george@orwell.com', 'password')

        self.c.post('/auth/login',
                    json.dumps({'username': 'george',
                                'password': 'password',
                                }),
                    content_type="application/json")

        assert self.c.session['_auth_user_id'] is not None

    def test_logout_successful(self):
        """
        Users can logout successfully.
        """
        User.objects.create_user('george', 'george@orwell.com', 'password')
        self.c.login(username='george', password='password')

        self.c.post('/auth/logout')

        assert '_auth_user_id' not in self.c.session
    
    def test_user_retrieve_self_information(self):
        """
        User can check if is logged (with information) or not
        """

        response = self.c.get('/auth/me')
        assert response.json()['data']['user'] == None

        User.objects.create_user('george', 'george@orwell.com', 'password')
        self.c.login(username='george', password='password')

        response = self.c.get('/auth/me')
        assert response.json()['data']['user']['username'] == 'george'
