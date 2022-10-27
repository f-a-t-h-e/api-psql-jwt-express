DROP TYPE IF EXISTS STATUS;
CREATE TYPE STATUS AS ENUM ('active', 'complete');
CREATE TABLE IF NOT EXISTS orders (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        products VARCHAR[],
        quantity VARCHAR[],
        user_id VARCHAR,
        status STATUS
    );