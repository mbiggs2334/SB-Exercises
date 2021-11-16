DROP DATABASE IF EXISTS outer_space;
CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE stars (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  size TEXT NOT NULL,
  density TEXT NOT NULL,
  orbiting_planets INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE galaxies (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
);

CREATE TABLE planets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around INTEGER REFERENCES stars(id),
  galaxy INTEGER REFERENCES galaxies(id),
  moons TEXT[]
);