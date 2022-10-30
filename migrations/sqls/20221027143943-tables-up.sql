CREATE TABLE IF NOT EXISTS users (
        user_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        password CHAR(60) NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT now()

    );
CREATE TABLE IF NOT EXISTS products (
    product_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(30) NOT NULL,
    price FLOAT DEFAULT 0,
    catagory VARCHAR(15),
    date TIMESTAMP NOT NULL DEFAULT now()

);
DROP TYPE IF EXISTS STATUS;
CREATE TYPE STATUS AS ENUM ('active', 'complete');
CREATE TABLE IF NOT EXISTS orders (
        order_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
        status BOOLEAN DEFAULT false,
        date TIMESTAMP NOT NULL DEFAULT now()
    );
CREATE TABLE IF NOT EXISTS bills (
    bill_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    order_id uuid REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id uuid REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    date TIMESTAMP NOT NULL DEFAULT now()
);
