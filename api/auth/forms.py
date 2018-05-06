from django.contrib.auth.models import User
from django.forms import ModelForm
from django.core.mail import send_mail
from django.conf import settings


class UserForm(ModelForm):

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'email']

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True
        self.fields['email'].required = True

    def send_greetings_email(self):
        send_mail(
            'Welcome to Wallapp',
            'You have registered to Wallapp. Welcome :)',
            settings.EMAIL_FROM,
            [self.cleaned_data["email"]],
            fail_silently=False,
        )

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        self.send_greetings_email()
        return user
