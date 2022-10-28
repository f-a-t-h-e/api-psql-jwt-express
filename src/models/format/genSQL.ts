const generateSQL = (
  command: "SELECT" | "INSERT INTO" | "UPDATE" | "DELETE" = "SELECT",
  table: "user" | "product" | "order" | "bill",
  user_id: string = "",
  values: string[] = [],
  input_id: string = "",
  condition: string = ""
): string | "" => {
  let sql: string = ``;
  // DONE
  if (command === "SELECT") {
    if (table === "user") {
      if (condition) condition = ` WHERE ${condition}`;
      return `${command} * FROM ${table}${condition}`;
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
        ${condition}`;
      }
      return `${command} * FROM ${table}${condition}`;
    }
    // REMINDER : use .slice(0, 5) FOR 5 most recent purchases
    // bills: num of bills, product_id[], quantity[], order_id, user_id, status, date
    // DONE
    if (table === "order") {
      condition = condition
        ? ` AND o.status='${condition}' `
        : ` AND o.order_id='${input_id}' `;
      return `
      SELECT COUNT(b.bill_id) AS bills, 
      ARRAY_AGG(b.product_id ORDER BY b.date ASC) AS products ,
      ARRAY_AGG(b.quantity ORDER BY b.date ASC) AS quantity,
      o.order_id,
      o.user_id,
      o.status
      FROM orders AS o 
       JOIN  bills AS b ON o.order_id = b.order_id
     JOIN users u
     ON o.user_id = u.user_id
     WHERE u.user_id = '${user_id}'
     ${condition}
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
    return `${command} ${table}s
      VALUES (DEFAULT,${values.map((v) => `'${v}'`)}) 
      RETURNING *`;
  }
  if (command === "UPDATE") {
    if (table === "user") {
      return `${command} ${table}s SET ${values} WHERE ${table}_id='${user_id}' RETURNING *`;
    }
    if (table === "product") {
      `${command} ${table}s SET ${values} WHERE user_id='${user_id}' AND ${table}_id='${input_id}' RETURNING *`;
    }
    if (table === "order") {
      return `${command} ${table}s SET status='complete'
       WHERE user_id='${user_id}' 
       AND status='active' 
       AND ${table}_id='${input_id}'`;
    }

    return `${command} ${table}s SET ${values} 
    WHERE user_id='${user_id}' AND ${table}_id='${input_id}'`;
  }
  // DONE
  if (command === "DELETE") {
    return `${command} FROM ${table}s WHERE user_id='${user_id}' AND ${table}_id='${input_id}' RETURNING *`;
  }
  return sql;
};

export default generateSQL;
