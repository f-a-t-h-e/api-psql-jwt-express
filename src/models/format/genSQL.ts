type Values = (string | number)[];
interface Options {
  table: "user" | "product" | "order" | "bill";
  command: "SELECT" | "INSERT INTO" | "UPDATE" | "DELETE";
  user_id?: string;
  values?: Values;
  input_id?: string;
  condition?: number | "complete" | "active";
}

const generateSQL = (options: Options): string | "" => {
  let { table, command, user_id, values, input_id, condition } = options;
  // DONE
  if (command === "SELECT") {
    if (table === "user") {
      if (input_id) {
        input_id = ` WHERE ${table}_id='${input_id}'`;
      }
      return `${command} user_id, email, first_name, last_name FROM ${table}s${
        input_id ? input_id : ""
      }`;
    }
    // DONE
    if (table === "product") {
      // ONE PRODUCT
      if (input_id) {
        return `${command} * FROM ${table}s WHERE ${table}_id='${input_id}'`;
      }
      // TOP 5 PRODUCTS
      if (condition) {
        return `SELECT COUNT(bill_id), product_id
        FROM bills
        GROUP BY product_id
        ORDER BY COUNT(bill_id) DESC
        LIMIT ${condition}`;
      }
      return `${command} * FROM ${table}s`;
    }
    // REMINDER : use .slice(0, 5) FOR 5 most recent purchases
    // bill_id[], product_id[], quantity[], order_id, user_id, status, date
    // DONE
    if (table === "order") {
      // TO SELECT orders FOR CURRENT USER PASS THEIR condition
      const con = condition
        ? ` AND o.status='${condition}' `
        : ` AND o.order_id='${input_id}' `;
      return `
      SELECT ARRAY_AGG(b.bill_id ORDER BY b.date ASC) AS bills, 
      ARRAY_AGG(b.product_id ORDER BY b.date ASC) AS products ,
      ARRAY_AGG(b.quantity ORDER BY b.date ASC) AS quantity,
      o.order_id,
      o.user_id,
      o.status
      FROM orders AS o 
       LEFT JOIN  bills AS b ON o.order_id = b.order_id
     JOIN users u
     ON o.user_id = u.user_id
     WHERE u.user_id = '${user_id}'
     ${con}
     GROUP BY o.order_id
     ORDER BY o.date
      `;
    }
    // IF NEEDED GETTING A BILL
    if (input_id) input_id = ` AND ${table}_id='${input_id}'`;
    return `${command} * FROM ${table}s WHERE user_id='${user_id}'`;
  }
  // DONE
  if (command === "INSERT INTO") {
    if (table === "user") {
      return `${command} ${table}s
      VALUES (DEFAULT,${values?.map((v) => `'${v}'`)},DEFAULT) 
      RETURNING user_id, email, first_name, last_name`;
    }
    return `${command} ${table}s
      VALUES (DEFAULT,${values?.map((v) => `'${v}'`)},DEFAULT) 
      RETURNING *`;
  }
  if (command === "UPDATE") {
    if (table === "user") {
      return `${command} ${table}s SET ${values} WHERE ${table}_id='${user_id}' RETURNING user_id, email, first_name, last_name`;
    }
    if (table === "product") {
      return `${command} ${table}s SET ${values} WHERE user_id='${user_id}' AND ${table}_id='${input_id}' RETURNING *`;
    }
    if (table === "order") {
      return `${command} ${table}s SET status='complete'
       WHERE user_id='${user_id}' 
       AND status='active' 
       AND ${table}_id='${input_id}'`;
    }

    return `${command} ${table}s SET ${values} 
    WHERE user_id='${user_id}' AND ${table}_id='${input_id}' RETURNING *`;
  }
  // DONE
  if (command === "DELETE") {
    if (table === "user") {
      return `${command} FROM ${table}s WHERE ${table}_id='${user_id}' RETURNING user_id, email, first_name, last_name`;
    }
    return `${command} FROM ${table}s WHERE user_id='${user_id}' AND ${table}_id='${input_id}' RETURNING *`;
  }
  return "";
};

export default generateSQL;
export { Options, Values };
