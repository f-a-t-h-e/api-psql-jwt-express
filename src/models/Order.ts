import { getOne } from "../controllers/products";
import Client from "../db/connect";
import generateSQL, { Options, Values } from "./format/genSQL";

interface Order {
  order_id?: string;
  user_id?: string;
  bills?: string[];
  products?: string[];
  quantity?: number[];
  status?: false | true; // false:"active" | true:"complete" DEFUALT TO false
  date?: Date;
}

class Orders {
  // DONE
  async getComplete(user_id: string): Promise<Order[]> {
    try {
      const options: Options = {
        table: "order",
        command: "SELECT",
        user_id,
        condition: true,
      };
      const sql = generateSQL(options);
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
  // DONE WITH A NOTE
  async getOne(user_id: string, order_id: string = ""): Promise<Order> {
    try {
      const options: Options = {
        table: "order",
        command: "SELECT",
        user_id,
        input_id: order_id,
      };
      if (!order_id) options.condition = false;

      const sql = generateSQL(options);
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
  // DONE
  async create(user_id: string): Promise<Order> {
    try {
      const values: Values = [user_id, false];
      const options: Options = {
        table: "order",
        command: "INSERT INTO",
        values,
      };
      const sql = generateSQL(options);
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
  // DONE
  async update(O: Order): Promise<Order> {
    try {
      let sql: string = ``;
      const { order_id, user_id, products, quantity } = O;
      const old_O: Order = await this.getOne(user_id as string, order_id);
      const condition_0 =
        products && quantity && products.length === quantity.length;
      const condition_1 = old_O.products?.length === products?.length;
      if (condition_0 && old_O.bills && old_O.products && !condition_1) {
        const options: Options = {
          table: "bill",
          command: "DELETE",
          user_id: user_id,
          input_id: order_id,
        };
        sql += `${generateSQL(options)};
        `;
      }
      if (condition_0) {
        for (let i = 0; i < products.length; i++) {
          const product_id = products[i];
          const quantity_num = quantity[i];
          const values: Values = [
            user_id,
            order_id,
            product_id,
            quantity_num,
          ] as string[];
          const options: Options = {
            table: "bill",
            command: "INSERT INTO",
            values,
          };
          sql += `${generateSQL(options)};
            `;
        }
      } else if (condition_1 && condition_0 && old_O.bills) {
        for (let i = 0; i < products.length; i++) {
          const product_id = products[i];
          const quantity_num = quantity[i];
          const values: Values = [
            `product_id='${product_id}'`,
            `quantity='${quantity_num}'`,
          ];
          const bill_id = old_O.bills[i];
          const options: Options = {
            table: "bill",
            command: "UPDATE",
            values,
            user_id,
            input_id: bill_id,
          };
          sql += `${generateSQL(options)};
          `;
        }
      }
      if (sql === "") {
        return old_O;
      }

      const conn = await Client.connect();
      await conn.query(sql);
      const options: Options = {
        table: "order",
        command: "SELECT",
        user_id,
        input_id: order_id,
      };
      sql = generateSQL(options);
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
        `Couldn't UPDATE Order: ${O.order_id} For user: ${O.user_id}. Error: ${err}`
      );
    }
  }
  // DONE
  async complete(user_id: string, order_id: string) {
    try {
      const options: Options = {
        table: "order",
        command: "UPDATE",
        user_id,
        input_id: order_id,
      };
      const sql = generateSQL(options);
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
  // DONE
  async delete(user_id: string, order_id: string): Promise<Order> {
    try {
      const options: Options = {
        table: "order",
        command: "SELECT",
        user_id,
        input_id: order_id,
      };
      const sql = generateSQL(options);
      const conn = await Client.connect();
      const result = await conn.query(sql);
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
