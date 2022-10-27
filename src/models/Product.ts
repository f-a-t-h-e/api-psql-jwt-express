import Client from "../db/connect";

interface Product {
  id?: string;
  name: string;
  price: string;
}

class Products {
  async getAll(): Promise<Product[]> {
    try {
      const sql = `SELECT * FROM products`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't INDEX all the products. Error: ${err}`);
    }
  }
  async getOne(id: string): Promise<Product> {
    try {
      const sql = `SELECT * FROM products WHERE id=($1)`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't SHOW product: ${id}. Error: ${err}`);
    }
  }
  async create(P: Product): Promise<Product> {
    try {
      if (!P.name || !P.price) {
        throw new Error("Please Provide name, price.");
      }
      const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`;

      const conn = await Client.connect();
      const result = await conn.query(sql, [P.name, P.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't CREATE product: ${P.name}. Error: ${err}`);
    }
  }
  async update(id: string, P: Product): Promise<Product> {
    try {
      let sets: string = "";
      if (P.name) {
        if (!sets) {
          sets += `name='${P.name}'`;
        } else {
          sets += `, name='${P.name}'`;
        }
      }
      if (P.price) {
        if (!sets) {
          sets += `price='${P.price}'`;
        } else {
          sets += `, price='${P.price}'`;
        }
      }

      if (!sets) throw new Error("Please provide data to update");
      // Change provided values only
      const sql = `UPDATE users SET ${sets} WHERE id='$1' RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't UPDATE product: ${id}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<Product> {
    try {
      const sql = `DELETE FROM products WHERE id=($1) RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't DELETE product: ${id}. Error: ${err}`);
    }
  }
}

export default Products;
export { Product };
