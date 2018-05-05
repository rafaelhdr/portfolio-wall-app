FROM python:3.6

WORKDIR /code
COPY requirements.txt /code
RUN pip install -r requirements.txt

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
