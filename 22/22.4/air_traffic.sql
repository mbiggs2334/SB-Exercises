DROP DATABASE IF EXISTS air_traffic;
CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE airlines (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  #_of_planes INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE flights (
  id SERIAL PRIMARY KEY,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline INTEGER NOT NULL REFERENCES airlines(id),
  from_city INTEGER NOT NULL REFERENCES cities(id),
  from_country INTEGER NOT NULL REFERENCES countries(id),
  to_city INTEGER NOT NULL REFERENCES cities(id),
  to_country INTEGER NOT NULL REFERENCES countries(id),
  seats INTEGER NOT NULL
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  seat TEXT NOT NULL
  flight INTEGER NOT NULL REFERENCES flights(id)
);