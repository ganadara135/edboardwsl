#! /bin/bash
#
# yarn build:server
# up 으로 해도 컨테니어를 재성성하고 서비스 재시작해줌(stop, rm 과정 필요없음) 안되는것 같다면 --force-recreate
docker-compose -f ./dockerCompose/local.back.yml up --build #
#
# docker-compose -f ./dockerCompose/local.dev.yml up