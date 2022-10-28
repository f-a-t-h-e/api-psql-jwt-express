CREATE TABLE IF NOT EXISTS users (
        user_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR NOT NULL,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        password text NOT NULL
    );
CREATE TABLE IF NOT EXISTS products (
    product_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    catagory VARCHAR,
    price INTEGER DEFAULT 0
);
DROP TYPE IF EXISTS STATUS;
CREATE TYPE STATUS AS ENUM ('active', 'complete');
CREATE TABLE IF NOT EXISTS orders (
        order_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
        status STATUS NOT NULL,
        date text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMMDD')
    );
CREATE TABLE IF NOT EXISTS orders_products (
    bill_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id uuid REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id uuid REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    date text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMMDD')
);
