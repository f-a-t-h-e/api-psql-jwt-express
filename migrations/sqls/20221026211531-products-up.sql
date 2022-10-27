CREATE TABLE IF NOT EXISTS products (
    product_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    price INTEGER NOT NULL
)