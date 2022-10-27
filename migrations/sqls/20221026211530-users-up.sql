CREATE TABLE IF NOT EXISTS users (
        user_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR NOT NULL,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        password text NOT NULL
    );