FROM ruby:2.5.5-alpine

RUN apk add --update \
  build-base \
  linux-headers \
  mariadb-client \
  mariadb-dev \
  tzdata \
  nodejs 

ENV APP_ROOT /app

RUN mkdir ${APP_ROOT}

WORKDIR ${APP_ROOT}

ADD ./app ${APP_ROOT}

RUN bundle install
