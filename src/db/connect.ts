import dotenv from "dotenv";
import { Pool, PoolClient, PoolConfig } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB_DEV,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
  ENV,
} = process.env;

let Client;

if (`${ENV}` === "dev") {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_DEV,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    max: 40,
  });
}

if (`${ENV}` === "test") {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    max: 40,
  });
}
console.log(ENV);

export default Client as Pool;
