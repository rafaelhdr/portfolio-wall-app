# Scripts for wall-app


# Initialize api database and install react dependencies
# It is necessary to `chmod 777 db.sqlite` for later e2e tests, because
# It will flush data of the mock user
init:
	{ \
	docker-compose -f docker-compose.development.yml run api sh -c "python manage.py migrate" && \
	docker-compose -f docker-compose.development.yml run api sh -c "chmod 777 db.sqlite3" && \
	docker-compose -f docker-compose.development.yml run front sh -c "npm install" && \
	make development; \
	}

build:
	docker-compose -f docker-compose.development.yml build

development:
	docker-compose -f docker-compose.development.yml up -d

logs:
	docker-compose -f docker-compose.development.yml logs -f

stop:
	docker-compose -f docker-compose.development.yml stop


test: test-front test-api test-e2e

test-front:
	cd front && make test

test-api:
	cd api && make test

test-e2e: development
	sh e2e/test.sh
