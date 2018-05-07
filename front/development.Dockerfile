# Developmento version does not copy the source-code
# because the volume will be mounted by docker-compose

FROM node:8.11

WORKDIR /code

CMD /bin/sh -c "npm start"
