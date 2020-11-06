# prod 용 설치 방법
1. dockerCompose 폴더 안에서 .env  mysqlDB_cnf  deploy.yml  파일만 필요
1. 위 3개 파일을 같은 위치에 놓고 실행
1. rdb volume 설정, mysqlDB_cnf 폴더와 컨테이너 mysql 폴더 연결 설정
> docker-compose -f deploy.yml up

# tips
1.설치 모듈 버전 확인
> npx yarn why 모듈명
2. graphql resolutions 문제발생
> 다양한 버전의 graphql 이 설치돼어서 그렇다, resolutions 으로 1차 처리해도 안되면
> npm, yarn 에서 2곳에서 조사후에 npm 에서 중복된 버전 제거
3. wait-for-it.sh 이 docker build 에서 복사가 안돼서 packages 폴더에서 옮겨서 복사함
4. FRONTEND_HOST 는 NGINX 설치된 곳, REACT_APP_SERVER_URL 는 apollo server 설치 위치

# yarn 
1. yarn version 1.22.4 에서 개발됨
> yarn set version 1.22.4
1. 모듈 충돌문제
1. duplicate module 문제
~~~{                                                  <br>
   yarn clean cache                                <br>
   npm -rf node_modules                               <br>
   {  // 루트 package.json  에  첨가                  <br>
      "workspaces": {                                 <br>
      "packages": [                                   <br>
         "packages/*"                                 <br>
      ],                                              <br>
      "nohoist": [            //server 밑에 graphql 들은  해당버전으로  사용하도록함      <br>
         "**/server/graphql"                          <br>
      ]                                                  <br>
   },                                                 <br>
   yarn install                                       <br>
}~~~

1. yarn list "모듈명"     모듈 관련 목록을 보여줌
1. resolutions 을 활용, 


# 소스코드 위치
윈도우즈 파일시스템 내에 놓지 않고, 리눅스 파일시스템 내에 소스코드를 위치시킴
그렇지 않으면 ntfs <-> extf 전환과정이 내부적으로 작동하므로 겁나게 느림
/home/filelocation  
리눅스 내에 파일 위치시킴
파일권한 문제가 생기므로 모든 파일과 디렉토리를 777 로 변경
> chmod 777 -R /home/filelocation
mysql 환경설정 파일은 읽기권한만 있어야 설정가능하므로, 해당폴더 설정 바꿈
> chmod 444 -R ./dockerCompose/mysqlDB_cnf/ 

# wsl 세팅
docker bind mount completed on wsl

# wsl 에서 실행 방법
1. window terminal 에서 WSL 가동
1. 해당 소스 위치로 이동
1. code .   명령어로 VS code 실행
1. 루트 폴더에서 bash shell 실행
1. > /bin/bash startLocalServer.sh
1. > /bin/bash startLocalWeb.sh

# grafana query 명령어  
1. mixed 선택
2. mysql <br>
   2.1 Format as Time Series 선택 <br>
   2.2 time range : 6개월  <br>
   2.3 query 문   <br>
      SELECT
      -- month,
      M.goal as mGoal,
      -- Y.year,
      -- Y.goal as yGoal,
      M.myTimestamp as time
      FROM MonthGoals as M
      inner join YearToMonthMNs as MN on MN.mgidId = M.id
      inner join YearGoals as Y on Y.id = MN.ygidId;
3. influxql  <br>
   3.1 Format as Time Series 선택  <br>
   3.2 time range : 6개월  <br>
   3.3 query 문 <br>
      SELECT sum("meter0/ActivePower") as TwoWeeks FROM "data" WHERE time >= '2020-01-01T00:00:00Z' AND time <= '2020-07-30T23:59:59Z' GROUP BY time(15d)   <br>

# 차후 진행 사항
  1. graphql-typescript-definitions  본  npm 모듈로, genSchema() 대체 함
     기존 건 암묵적으로 namespaces를 가져오는 방식이라서 현재 Typescript 와 안 맞는 거 같음
     export 를 자동으로 생성해 주는 최신 버전으로 교체 

# 실행 방법
   ## 로컬 환경
   1. 실행환경파일 설정
      1.1  .env.local   파일을 루트 폴더에 .env 로 저장
   2.  ./startLocalServer.sh  실행
   3.  ./startLocalWeb.sh    실행 
   ## 실행 환경(세종대)
   1. 실행환경파일 설정
      1.1  .env.prod  파일을 루트 폴더에 .env 로 저장
   2. ./dockerCompose/for-real-machine.yml 를  루트 폴더로 이동(.env 와 같은 위치에 놓음)
   3. sudo docker-compose -f for-real-machine.yml up -d

# 개발환경 설정
   1. tslint 설정확인

# 사용 포트 정리
1. backend
   80 : nginx 용
   4000 : graphQL
   587 : SMTP
   3306 : mariadb
   6379 : redis
2. frontend
   80 : nginx 용

## 개인 메모

차례 : Multi Step Form in React with Formik - Part 36
추가고려사항 : postgres 와 redis 도 docker  위에서 작동시키고, docker container 들을 swarm 처리 

# 가동 절차

1. PostgreSQL start <br/>
   <p>Docker-compose 대치 </p>
   > postgres 설정 : https://seogenie2.tistory.com/5 <br>
   [마이컴용] <br/>
   > pg_ctl -D /Users/mac/work/mobileHomeHub/abb/db_postgre -l logfile start
2. Redis-server start
   <p>Docker-compose 대치 </p>
   > redis-server
3. Server start
   <p>Docker-compose 대치 </p>
   > yarn start
4. client start (web)
   <p>Docker-compose 대치 </p>
   > yarn start

5. docker 이미지 빌드 <br>
   > docker build -t kcod/abb:1.0.0 . <br>

   5.1. docker 컨테이너 실행 <br>
      > docker run -p 3001:4000 --net="host" -d kcod/abb:1.0.0 <br>
      > docker run -it -p 3001:4000 -d kcod/abb:1.0.0 /bin/bash <br>
      > docker run -p 4000:4000 -p 5432:5432 -p 6379:6379 -d --name abb ganadara135/abb:1.0.0 node dist/index.js <br>
      > docker run -p 80:4000 -p 5432:5432 -p 6379:6379 -d --name abb ganadara135/abb node dist/index.js
      > docker run -p 80:4000 --net host -d --name abb ganadara135/abb node dist/index.js

   5.2. docker 컨테이너 디버깅 <br>
      > docker commit 298b7344f067a => broken_container <br>
        docker run -it broken_container /bin/bash  or /bin/sh <br>
        node dist/index.js <br>
6. docker push on dockerhub
   > docker tag local-image:tagname new-repo:tagname
     docker push new-repo:tagname

   6.1 docker tag kcod/abb:1.0.?  ganadara135/abb:latest

   6.2 docker push ganadara135/abb:latest
7. docker-compose 는 Dockerfile 를 같은 폴더에 있어야 build 가능
   > docker-compose -f ./dockerCompose/dev.yml up --build
7. PostgreSQL 정보
   7.1 설치위치  /usr/lib/systemd/system/postgresql-9.6.service
   7.2 /var/lib/pgsql/9.6/data/    postgressql.conf  위치  
8. Redis 설정
   8.1 .env  와 .env.prod  두 개 다 사용함.  .env.prod 
   8.2 docker build 시에 .env 파일은 copy 안됨
   8.3 redis 가 설정이 안되면 아무 에러 메시지 없이 ERR_EMPTY_RESPONSE  메시지 받음
9. Web 설정 : deploy_web.sh  and check README.md on web folder
10. app 설정 주의사항
   10.1. expo 는 의존관계 모듈을 실행시 다가지고 있어야 함, workspaces nohoist 설정 주의
   10.2. dependency 설정시 react 관련 항목은 같은 버전이라도 2개 이상 갖고 있으면, 중복 예러 발생(react-hooks 때문), 따라서 의존소스를 복사해서 expo 내에서 옮겨놓고 코딩하기 
   10.3. npm is reac-dom     으로 확인
11. change Mailserver as Nodemailer.
   11.1 ./testnodemailer/node index.js   실행

12. TypeORM 관련
   12.1 환경설정 파일은 하나만 처리한다. 복수개 있으면 .env 만 처리


# RDB 설계도
https://drive.google.com/file/d/1yuoFU3VShBXmBREsuHlcYs0tzsEbWhE5/view?usp=sharing


# mysql 사용법
1. db 접속
   1.1 로컬 : mysql -u 계정명 -p
   1.2 원격 : mysql -h 호스트주소 -P 포트번호 -u 계정명 -p 
   1.3 원격지 특정DB : mysql -h 호스트주소 -P 포트번호 -u 계정명 -p 디비이름
2. show databases;
3. use 사용할 db 명;
4. show tables;
5. 필드별 상세내역 : show fields from 테이블명;
6. 필드 collations : show full columns from 테이블명;

# phpmyadmin 
접속 주소에 루푸홀 주소가 아닌 실제 아이피 적는다
X 127.0.0.1  localhost
O 192.168.1.23
https://blog.naver.com/kjamjalee/222022832289


# postgre  사용법
1. db 접속 방법:  psql graphql-ts-server-boilerplate (db명)
2. 테이블 조회  : \d
3. 접속터미널끄기 : \q
   

# ISSUE
1. 로컬에서 schema 읽어오는 것은 apollo.config.js 설정에서 못 읽어옴, 예제처럼 명령어에 옵션으로 처리해야 함 <br>
  ex) npx apollo client:codegen --target typescript --localSchemaFile ./schema.graphql <br>
2. apollo client:check 검증용 명령어는 apollo 사의 registry 만 됨, 로컬은 안됨. <br>
3. 매체별(server, web, app)로 전용 모듈은 해당 매체에서만 사용하게 하는 명령어 on package.json
   "nohoist": [
      "**/rimraf",
      "**/rimraf/**",
      "**/react-native",
      "**/react-native/**",
      "**/react-native-elements",
      "**/react-native-elements/**",
      "**/expo",
      "**/expo/**",
      "**/react-native-typescript-transformer",
      "**/react-native-typescript-transformer/**",
      "**/metro-bundler-config-yarn-workspaces",
      "**/metro-bundler-config-yarn-workspaces/**"
   ]
   3.1  check packages 상태 :  yarn workspaces info
4. remove well
   => rm -rf node_modules ../../node_modules  ../../yarn.lock
5. workspace 체크 명령어
   => yarn workspaces run
6. expo issue : expo 는 실행시 필요 모듈을 다 가지고 있어야 함
   => workspace 즉 yarn packages 가 작동하지 않는다, 아래 방식으로 해결가능
   6.1 expo package.json 에 nohoist 로 설치된 모듈을 전부 표시
7. keep watch SemVer  ^(caret, inverted caret) ~(tilde, swung dash)
8. VScode 는 탐색창에서 소스 복사나 옮기는거 금지, 큰 용량은 제대로 이동 안됨.
9. gql 문장 바로 위에는 첨삭문 넣지 마라, 아마 에러메시지도 없이 schema 생성하지 않는다
10. MySQL 에 관리자툴 phpMyadmin 이나 adminer 연결시에 전체 설정 내역 완전 삭제후에 적용, docker system prune, docker volume prune





# 참고링크
1. apollo-codegen :   https://github.com/expo/apollo-codegen <br>
2. nohoist : https://classic.yarnpkg.com/blog/2018/02/15/nohoist/ <br>
3. node.js dockerizing : https://nodejs.org/en/docs/guides/nodejs-docker-webapp/ <br>
4. lerna : https://github.com/lerna/lerna#readme
5. netlify : https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file
6. monorepo : https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/
7. https://nodemailer.com/about/
8. https://ethereal.email/
9. https://typeorm.io/#/
10. https://app.diagrams.net/

