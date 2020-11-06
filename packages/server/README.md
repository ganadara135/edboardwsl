# 이슈 정리
1. typeorm 의  BaseEntity.d.ts  에서  create<T>  인터페이스의 entityLikeArray 처리하는 것 비활성화 시킴 <br>
   save() 가 작동 안되어서 조치함 <br>
2. myTypes.d.ts 의  "export const typeDefs"  이 부분에 에러 발생,  const -> type 으로 수기 변경, <br>
   에러메시지: A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference. <br>
3. graphq type 명과 TypeORM 속성 명을 일치하게 작성( if there are relations)
4. ormconfig.json 파일은 TypeORM migration 을 위한 설정 파일 역할만 함, host 항목 제거 필요


# graphql-ts-server-boilerplate

A GraphQL Server boilerplate made with Typescript, PostgreSQL, and Redis

## Installation

1. Clone project
```
git clone https://github.com/benawad/graphql-ts-server-boilerplate.git
```
2. cd into folder
```
cd graphql-ts-server-boilerplate
```
3. Download dependencies 
```
yarn
```
4. Start PostgreSQL server
5. Create database called `graphql-ts-server-boilerplate`
```
createdb graphql-ts-server-boilerplate
```
6. [Add a user](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e) with the username `postgres` and and no password. (You can change what these values are in the [ormconfig.json](https://github.com/benawad/graphql-ts-server-boilerplate/blob/master/ormconfig.json))

7. Install and start Redis

## Usage

You can start the server with `yarn start` then navigate to `http://localhost:4000` to use GraphQL Playground.

## Features

* Register - Send confirmation email
* Login
* Forgot Password
* Logout  
* Cookies
* Authentication middleware
* Rate limiting
* Locking accounts
* Testing (probably Jest)

## Watch how it was made

Playlist: https://www.youtube.com/playlist?list=PLN3n1USn4xlky9uj6wOhfsPez7KZOqm2V
