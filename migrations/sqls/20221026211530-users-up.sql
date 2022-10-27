CREATE TABLE IF NOT EXISTS users (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR,
        first_name VARCHAR,
        last_name VARCHAR,
        password text
    );