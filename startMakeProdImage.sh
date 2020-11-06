#! /bin/bash
# npx yarn build:server
# npx yarn build:web
#
docker build -f ./dockerCompose/Dockerfile.back.prod.compose -t ganadara135/abbback:latest ./  #
docker build -f ./dockerCompose/Dockerfile.front.prod.compose -t ganadara135/abbfront:latest ./  #
#
#
docker push ganadara135/abbback:latest   #
docker push ganadara135/abbfront:latest    #
# ssh root@49.236.137.191 -p 1025 -i ../abb_rsa "docker stop abb && docker rm abb && docker pull ganadara135/abb:latest && docker run -p 4000:4000 -p 5432:5432 -p 6379:6379 -d --name abb ganadara135/abb:latest node dist/index.js"
#