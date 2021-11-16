DROP DATABASE IF EXISTS music;
CREATE DATABASE music;

\c music

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE producers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  release_date DATE NOT NULL,
  artist INTEGER NOT NULL REFERENCES artists(id),
  producer INTEGER NOT NULL REFERENCES producers(id)
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  artists INTEGER NOT NULL REFERENCES artists(id),
  album INTEGER NOT NULL REFERENCES albums(id),
  producers INTEGER NOT NULL  REFERENCES producers(id)
);
