# Wall App

> This is a portfolio open-source application using React and Django REST framework.

## Requirements

[Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

## Running local

The project is prepared for running in local environments (volume is mounted instead of creating the application image).

To start the project:

```shell
make development
```

or

```shell
docker-compose -f docker-compose.development.yml up -d
```

### (Optional) Send e-mail

The default configuration print the e-mail in the console. To send e-mail via AWS SES, it is necessary to export the required values:

```shell
export WALLAPP_AWS_ACCESS_KEY_ID='AWS_ACCESS_KEY_ID'
export WALLAPP_AWS_SECRET_ACCESS_KEY='AWS_SECRET_ACCESS_KEY'
export WALLAPP_AWS_SES_REGION_NAME='AWS_SES_REGION_NAME' # Example: us-west-2
export WALLAPP_EMAIL_FROM='example@example.com' # AWS SES need permission to send e-mail from EMAIL_FROM

make development
```

## Tests

There are tests for the front (React), api (Python/Django) and End-to-end (using docker-compose). For running all of them:

```shell
make test
```
