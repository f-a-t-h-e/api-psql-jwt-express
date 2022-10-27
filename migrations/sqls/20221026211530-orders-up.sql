DROP TYPE IF EXISTS STATUS;
CREATE TYPE STATUS AS ENUM ('active', 'complete');
CREATE TABLE IF NOT EXISTS orders (
        order_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id VARCHAR REFERENCES users(user_id),
        status STATUS
    );