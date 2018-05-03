
build:
	docker-compose -f docker-compose.development.yml build

development:
	docker-compose -f docker-compose.development.yml up -d

logs:
	docker-compose -f docker-compose.development.yml logs -f

stop:
	docker-compose -f docker-compose.development.yml stop


test: test-front

test-front:
	cd front && make test
