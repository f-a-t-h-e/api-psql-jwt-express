import dotenv from "dotenv";
dotenv.config();
import Client from "../db/connect";
import bcrypt from "bcrypt";
import generateSQL, { Options } from "./format/genSQL";
interface User {
  user_id?: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
}

const hashPass = (pass: string): string => {
  const hashedPass = bcrypt.hashSync(`${pass}${process.env.PEPPER}`, 10);
  return `${hashedPass}`;
};

class Users {
  // DONE
  async getAll(): Promise<User[]> {
    try {
      const options: Options = {
        table: "user",
        command: "SELECT",
      };
      const sql = generateSQL(options);
      console.log(sql);

      const conn = await Client.connect();
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't INDEX any Users. Error: ${err}`);
    }
  }
  // DONE
  async getOne(user_id: string): Promise<User> {
    try {
      const options: Options = {
        table: "user",
        command: "SELECT",
        input_id: user_id,
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't SHOW user: ${user_id}. Error: ${err}`);
    }
  }
  // DONE
  async create(U: User): Promise<User> {
    try {
      const { email, first_name, last_name, password } = U;
      if (!email || !first_name || !last_name || !password) {
        throw new Error(
          "Please Provide email, first_name, last_name and password"
        );
      }
      const options: Options = {
        table: "user",
        command: "INSERT INTO",
        values: [email, first_name, last_name, hashPass(password)],
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't CREATE User: ${U.first_name} ${U.last_name}. Error: ${err}`
      );
    }
  }
  // DONE
  async update(user_id: string, U: User): Promise<User> {
    try {
      const { email, first_name, last_name, password } = U;
      const values: string[] = [];
      if (email) values.push(`email='${email}'`);
      if (first_name) values.push(`first_name='${first_name}'`);
      if (last_name) values.push(`last_name='${last_name}'`);
      if (password) values.push(`password='${hashPass(password)}'`);
      const options: Options = {
        table: "user",
        command: "UPDATE",
        values,
        user_id,
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't UPDATE user: ${user_id}. Error: ${err}`);
    }
  }
  // DONE
  async delete(user_id: string): Promise<User> {
    try {
      const options: Options = {
        table: "user",
        command: "DELETE",
        user_id,
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't DELETE User: ${user_id}. Error: ${err}`);
    }
  }
  async login(email: string, password: string): Promise<User | ""> {
    try {
      if (!email || !password) {
        throw new Error("Please provide email and password");
      }
      const sql = `SELECT password FROM users WHERE email='${email}';`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      for (let i = 0; i < result.rows.length; i++) {
        const element = result.rows[i].password;
        if (
          bcrypt.compareSync(`${password}${process.env.PEPPER}`, `${element}`)
        ) {
          const sql = `SELECT user_id, email, first_name, last_name FROM users WHERE email='${email}'
            AND password='${element}';`;
          const result_ = await conn.query(sql);
          conn.release();
          return result_.rows[0];
        }
      }
      conn.release();
      return "";
    } catch (err) {
      throw new Error(`Couldn't authenticate. Error: ${err}`);
    }
  }
  async auth(U: User): Promise<User> {
    try {
      const sql = `SELECT user_id, email, first_name, last_name FROM users 
      WHERE email='${U.email}' AND first_name='${U.first_name}' AND last_name='${U.last_name}';`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();

      if (!result.rows[0]) {
        throw new Error("Invalid");
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't authenticate. Error: ${err}`);
    }
  }
}

export default Users;
export { User };
