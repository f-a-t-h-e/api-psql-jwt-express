
CREATE TABLE IF NOT EXISTS bills (
    bill_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    order_id uuid REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id uuid REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    date TIMESTAMP NOT NULL DEFAULT now()
);
