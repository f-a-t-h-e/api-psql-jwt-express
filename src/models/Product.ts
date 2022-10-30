import Client from "../db/connect";
import generateSQL, { Options, Values } from "./format/genSQL";

interface Product {
  product_id?: string;
  user_id?: string;
  name: string;
  price: number;
  catagory: string;
}

class Products {
  // DONE
  async getAll(): Promise<Product[]> {
    try {
      const options: Options = {
        table: "product",
        command: "SELECT",
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't INDEX all the products. Error: ${err}`);
    }
  }
  async getByCat(catagory: string): Promise<Product[]> {
    try {
      const options: Options = {
        table: "product",
        command: "SELECT",
        condition: catagory,
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't INDEX all the products. Error: ${err}`);
    }
  }
  async getTop(condition: number) {
    try {
      const options: Options = {
        table: "product",
        command: "SELECT",
        condition,
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't INDEX all the products. Error: ${err}`);
    }
  }
  // DONE
  async getOne(product_id: string): Promise<Product> {
    try {
      const options: Options = {
        table: "product",
        command: "SELECT",
        input_id: product_id,
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't SHOW product: ${product_id}. Error: ${err}`);
    }
  }
  // DONE
  async create(P: Product): Promise<Product> {
    try {
      const { user_id, name, price, catagory } = P;
      if (!user_id || !name || !price || !catagory) {
        throw new Error("Login and Provide name, price and catagory.");
      }
      const values: Values = [user_id, name, price, catagory];
      const options: Options = {
        table: "product",
        command: "INSERT INTO",
        values,
      };
      const sql = generateSQL(options);

      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't CREATE product: ${P.name}. Error: ${err}`);
    }
  }
  // DONE
  async update(P: Product): Promise<Product> {
    try {
      const { product_id, user_id, name, price, catagory } = P;
      if (!product_id && !user_id && (!name || !price || !catagory)) {
        throw new Error(
          "Login and select the product you want to update and provide data to be updated"
        );
      }
      const values: Values = [];
      if (name) values.push(`name='${name}'`);
      if (price) values.push(`price='${price}'`);
      if (catagory) values.push(`catagory='${catagory}'`);
      const options: Options = {
        table: "product",
        command: "UPDATE",
        values,
        user_id,
        input_id: product_id,
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't UPDATE product: ${P.product_id}. Error: ${err}`
      );
    }
  }
  // DONE
  async delete(user_id: string, product_id: string): Promise<Product> {
    try {
      const options: Options = {
        table: "product",
        command: "DELETE",
        user_id,
        input_id: product_id,
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't DELETE product: ${product_id}. Error: ${err}`);
    }
  }
}

export default Products;
export { Product };
