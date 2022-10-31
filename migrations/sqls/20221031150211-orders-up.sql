CREATE TABLE IF NOT EXISTS orders (
        order_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
        status BOOLEAN DEFAULT false,
        date TIMESTAMP NOT NULL DEFAULT now()
    );