import Client from "../db/connect";

interface Product {
  product_id?: string;
  name: string;
  price: number;
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
  async getOne(product_id: string): Promise<Product> {
    try {
      const sql = `SELECT * FROM products WHERE product_id=($1)`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [product_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't SHOW product: ${product_id}. Error: ${err}`);
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
  async update(product_id: string, P: Product): Promise<Product> {
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
      const sql = `UPDATE products SET ${sets} WHERE product_id=($1) RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [product_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't UPDATE product: ${product_id}. Error: ${err}`);
    }
  }
  async delete(product_id: string): Promise<Product> {
    try {
      const sql = `DELETE FROM products WHERE product_id=($1) RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [product_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't DELETE product: ${product_id}. Error: ${err}`);
    }
  }
}

export default Products;
export { Product };
