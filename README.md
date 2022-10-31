you will need the following to start this server:-

-postgres

-node

-db-migrate

-yarn

Ports

DB 5432

Server 3000

setup:-
run `yarn`
```
yarn add global db-migrate
```
```
psql -U postgres
```
Enter your password (if you have one).
```
CREATE USER full_stack_user WITH PASSWORD 'password123';
```
```
CREATE DATABASE store_dev;
```
```
CREATE DATABASE store_test;
```
```
GRANT ALL PRIVILAGES ON DATABASE store_dev TO full_stack_user;
```
```
GRANT ALL PRIVILAGES ON DATABASE store_test TO full_stack_user;
```

test:-
run `yarn test`

start:-
run `yarn start`

# Check .env.example & migrations/sqls/\*\*up.sql files for dotenv variables, port and database schema

