import Client from "../db/connect";

interface Order {
  id?: string;
  products: string[];
  quantity: string[];
  user_id?: string;
  status?: "active" | "complete";
}

class Orders {
  async getAll(user_id: string): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Couldn't INDEX any orders for user: ${user_id}. Error: ${err}`
      );
    }
  }
  async getOne(id: string, user_id: string): Promise<Order> {
    try {
      const sql = `SELECT * FROM orders WHERE id=($1) AND user_id=($2)`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id, user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't SHOW order: ${id} for user: ${user_id}. Error: ${err}`
      );
    }
  }

  async create(O: Order, user_id: string): Promise<Order> {
    try {
      if (!O.products || !O.quantity || !user_id) {
        throw new Error("Please Provide products, quantity, user_id.");
      }

      const sql = `INSERT INTO orders (products, quantity, user_id, status) VALUES ('{${
        O.products
      }}', '{${O.quantity}}', '${user_id}', '${
        O.status === "complete" ? "complete" : "active"
      }' ) RETURNING *`;
      console.log(sql);

      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      console.log(result.rows);

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't CREATE an order For user: ${user_id}. Error: ${err}`
      );
    }
  }

  async update(id: string, O: Order, user_id: string): Promise<Order> {
    try {
      let sets: string = "";
      if (O.products) {
        if (!sets) {
          sets += `products='{${O.products}}'`;
        } else {
          sets += `, products='{${O.products}}'`;
        }
      }
      if (O.quantity) {
        if (!sets) {
          sets += `quantity='{${O.quantity}}'`;
        } else {
          sets += `, quantity='{${O.quantity}}'`;
        }
      }
      if (O.status === "active" || O.status === "complete") {
        if (!sets) {
          sets += `status='${O.status}'`;
        } else {
          sets += `, status='${O.status}'`;
        }
      }

      if (!sets) throw new Error("Please provide data to update");
      // Change provided values only
      const sql = `UPDATE orders SET ${sets} WHERE id='${id}' AND user_id='${user_id}' RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't UPDATE Order: ${id} For user: ${user_id}. Error: ${err}`
      );
    }
  }

  async delete(id: string, user_id: string): Promise<Order> {
    try {
      const sql = `DELETE FROM orders WHERE id=($1) AND user_id=($2) RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id, user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't DELETE order: ${id} For user: ${user_id}. Error: ${err}`
      );
    }
  }
}

export default Orders;
export { Order };
