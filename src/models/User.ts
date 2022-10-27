import dotenv from "dotenv";
dotenv.config();
import Client from "../db/connect";
import bcrypt from "bcrypt";
interface User {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

const hashPass = (pass: string): string => {
  const hashedPass = bcrypt.hashSync(`${pass}${process.env.PEPPER}`, 10);
  return `${hashedPass}`;
};

class Users {
  async getAll(): Promise<User[]> {
    try {
      const sql = `SELECT id, email, first_name, last_name FROM Users;`;
      const conn = await Client.connect();
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't INDEX any Users. Error: ${err}`);
    }
  }
  async getOne(id: string): Promise<User> {
    try {
      const sql = `SELECT id, email, first_name, last_name FROM users WHERE id=($1)`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't SHOW user: ${id}. Error: ${err}`);
    }
  }
  async create(U: User): Promise<User> {
    try {
      if (!U.email || !U.first_name || !U.last_name || !U.password) {
        throw new Error(
          "Please Provide email, first_name, last_name and password"
        );
      }
      const sql = `INSERT INTO users (email, first_name, last_name, password) 
      VALUES ('${U.email}', '${U.first_name}', '${U.last_name}','${hashPass(
        U.password
      )}') 
      RETURNING id, email, first_name, last_name`;
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
  async update(id: string, U: User): Promise<User> {
    try {
      let sets: string = "";
      if (U.email) {
        if (!sets) {
          sets += `email='${U.email}'`;
        } else {
          sets += `, email='${U.email}'`;
        }
      }
      if (U.first_name) {
        if (!sets) {
          sets += `first_name='${U.first_name}'`;
        } else {
          sets += `, first_name='${U.first_name}'`;
        }
      }
      if (U.last_name) {
        if (!sets) {
          sets += `last_name='${U.last_name}'`;
        } else {
          sets += `, last_name='${U.last_name}'`;
        }
      }
      if (U.password) {
        if (!sets) {
          sets += `password='${hashPass(U.password)}'`;
        } else {
          sets += `, password='${hashPass(U.password)}'`;
        }
      }

      if (!sets) throw new Error("Please provide data to update");

      // Change provided values only
      const sql = `UPDATE users SET ${sets} WHERE id='${id}' 
      RETURNING id, email, first_name, last_name;`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't UPDATE user: ${id}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<User> {
    try {
      const sql = `DELETE FROM users WHERE id=($1) RETURNING id, email, first_name, last_name`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't DELETE User: ${id}. Error: ${err}`);
    }
  }
  async login(email: string, password: string): Promise<User | "invalid"> {
    try {
      if (!email || !password) {
        throw new Error("Please provide email and password");
      }
      const sql = `SELECT password FROM users WHERE email='${email}';`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      for (let i = 0; i < result.rows.length; i++) {
        const element = result.rows[i].password;
        console.log(element);

        if (
          bcrypt.compareSync(`${password}${process.env.PEPPER}`, `${element}`)
        ) {
          const sql = `SELECT id, email, first_name, last_name FROM users WHERE email='${email}'
            AND password='${element}';`;
          const result_ = await conn.query(sql);
          conn.release();
          return result_.rows[0];
        }
      }
      conn.release();
      return "invalid";
    } catch (err) {
      throw new Error(`Couldn't authenticate. Error: ${err}`);
    }
  }
  async auth(U: User): Promise<User | "invalid"> {
    try {
      const sql = `SELECT id, email, first_name, last_name FROM users WHERE email='${U.email}' AND first_name='${U.first_name}'`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();

      if (!result.rows[0]) {
        return "invalid";
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't authenticate. Error: ${err}`);
    }
  }
}

export default Users;
export { User };
