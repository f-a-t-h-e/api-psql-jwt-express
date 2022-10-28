import Client from "../db/connect";

interface Order {
  order_id?: string;
  user_id?: string;
  products?: string[];
  quantity?: number[];
  status?: "active" | "complete";
  date?: Date;
}

class Orders {
  async getComplete(user_id: string): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id='${user_id}' AND status='complete'`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Couldn't INDEX any orders for user: ${user_id}. Error: ${err}`
      );
    }
  }
  async getCurrent(user_id: string): Promise<Order> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id='${user_id}' AND status='active'`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0]; // ATTENTION : CHECK IF IT NEEDS FIX FROM rows[0] to rows TO AVOID POTENTIAL ERRORS
    } catch (err) {
      throw new Error(
        `There is no current order for user: ${user_id}. Error: ${err}`
      );
    }
  }

  async create(user_id: string, O: Order): Promise<Order> {
    try {
      if (!user_id) {
        throw new Error("Please Provide user_id.");
      }

      const sql = `INSERT INTO orders (user_id, status)
       VALUES ('${user_id}', 'active') RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't CREATE an order For user: ${user_id}. Error: ${err}`
      );
    }
  }

  async update(user_id: string, order_id: string, O: Order): Promise<Order> {
    try {
      let sets: string = "";
      if (O.products) {
        if (!sets) {
          sets += `products='{${O.products}}'`;
        } else {
          sets += `, products='{${O.products}}'`;
        }
        if (!O.quantity || O.quantity.length !== O.products.length) {
          throw new Error(
            "You Can't edit products without providing the quantity of each product"
          );
        }
        if (!sets) {
          sets += `quantity='{${O.quantity}}'`;
        } else {
          sets += `, quantity='{${O.quantity}}'`;
        }
      }

      if (!sets) throw new Error("Please provide data to update");
      // Change provided values only
      const sql = `UPDATE orders SET ${sets}
       WHERE order_id='${order_id}' AND user_id='${user_id}' AND status='active'
       RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      if (!result.rows) {
        throw new Error(
          `This order:${order_id} is not active for this user:${user_id}`
        );
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't UPDATE Order: ${order_id} For user: ${user_id}. Error: ${err}`
      );
    }
  }
  async complete(user_id: string, order_id: string) {
    try {
      const sql = `UPDATE orders SET status='complete' 
      WHERE order_id='${order_id}' AND user_id='${user_id}' AND status='active'
      RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      if (!result.rows) {
        throw new Error("This order is not active or doesn't exist.");
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't complete this order: (${order_id}) for user: (${user_id})`
      );
    }
  }

  async delete(user_id: string, order_id: string): Promise<Order> {
    try {
      const sql = `DELETE FROM orders WHERE order_id=($1) AND user_id=($2) RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [order_id, user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't DELETE order: ${order_id} For user: ${user_id}. Error: ${err}`
      );
    }
  }
}

export default Orders;
export { Order };
