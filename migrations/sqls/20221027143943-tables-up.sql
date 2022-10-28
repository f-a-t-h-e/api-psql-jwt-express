CREATE TABLE IF NOT EXISTS users (
        user_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR NOT NULL,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        password text NOT NULL,
    date text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMMDD')

    );
CREATE TABLE IF NOT EXISTS products (
    product_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    price INTEGER DEFAULT 0,
    catagory VARCHAR,
    date text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMMDD')

);
DROP TYPE IF EXISTS STATUS;
CREATE TYPE STATUS AS ENUM ('active', 'complete');
CREATE TABLE IF NOT EXISTS orders (
        order_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
        status STATUS NOT NULL,
        date text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMMDD')
    );
CREATE TABLE IF NOT EXISTS bills (
    bill_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    order_id uuid REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id uuid REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    date text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYYMMDD')
);
