# sscholl/nodejs
# VERSION 0.0.1

FROM ubuntu
MAINTAINER Simon Scholl <s@sdscholl.de>

RUN apt update && apt install -y nodejs-legacy npm

ADD . /app
VOLUME [ "/app/data" ]

RUN cd /app && npm install

EXPOSE 5000 5443

CMD [ "node", "/app/index.js" ]
