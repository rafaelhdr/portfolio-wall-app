
test:
	{ \
	docker build -t wall-app-api-tests -f development.Dockerfile . && \
	docker run -v ${PWD}:/code -e SECRET_KEY=SECRET --rm -it wall-app-api-tests python manage.py test; \
	}
