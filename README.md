# graphql-rest-server

## Installation

```sh
# Clone (or fork) the repo
git clone https://github.com/shahanahmed86/graphql-rest-server.git && cd graphql-rest-server
# Fill out .env file with secrets (development only)
cp .env.example .env
# Install the deps
npm install
# dockerize your system then Run this command
npm run up
# run the server
npm run dev
```

## postgresql

```sh
# docker to open bash
docker exec -it graphql-rest-server_postgres-db_1 bas
# docker to open plsql
docker exec -it graphql-rest-server_postgres-db_1 psql -U prisma -W dev
# flags
-it # for interactive
-U # for username
-W # database
# postgresql terminal commands list
```

## redis commands

```sh
docker exec -it graphql-rest-server_cache_1 redis-cli -a secret
# flags
-it # for interactive
redis-cli # to load redis command line interface
-a # cli password
# redis commands
scan 0
get "adminToken"
ttl "adminToken"
del "adminToken"
```