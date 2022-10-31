
CREATE TABLE IF NOT EXISTS products (
    product_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(30) NOT NULL,
    price FLOAT DEFAULT 0,
    catagory VARCHAR(15),
    date TIMESTAMP NOT NULL DEFAULT now()

);