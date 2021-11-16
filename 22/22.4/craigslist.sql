DROP DATABASE IF EXISTS craigslist
CREATE DATABASE craigslist

\c craigslist

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    preferred_region TEXT REFERENCES region(id),
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    user_id INTEGER REFERENCES users(id),
    region INTEGER REFERENCES region(id),
    category INTEGER REFERENCES categories(id)
);

CREATE INDEX users_index ON users(username);