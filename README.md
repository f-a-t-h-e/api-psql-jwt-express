you will need the following to start this server:-

-postgres

-node

-db-migrate

-yarn

-.env file with the following keys:

PORT= the port for the server to run on

POSTGRES_HOST= the host for the db

POSTGRES_DB_DEV= db_dev name

POSTGRES_USER= db_user_name

POSTGRES_PASSWORD= the db_user_password

POSTGRES_DB_TEST= the db_test name

ENV= environment name (dev/test)

JWT_SECRET= your jwt secret

PEPPER= your bcrypt pepper string

setup:-
run `yarn`

test:-
run `yarn test`

start:-
run `yarn start`
