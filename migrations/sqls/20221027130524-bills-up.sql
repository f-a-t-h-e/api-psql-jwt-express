CREATE TABLE IF NOT EXISTS bills (
    bill_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id uuid REFERENCES orders(order_id),
    product_id uuid REFERENCES products(product_id),
    user_id uuid REFERENCES users(user_id),
    date text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMMDD')
);