DROP DATABASE IF EXISTS soccer_league
CREATE DATABASE soccer_league

\c soccer_league

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    league TEXT UNIQUE NOT NULL,
    wins INTEGER NOT NULL DEFAULT 0,
    losses INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    team INTEGER NOT NULL REFERENCES teams(id),
    goals INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    team1 TEXT NOT NULL,
    team2 TEXT NOT NULL,
    referee INTEGER REFERENCES referees(id)
);

CREATE TABLE goals (
    id SERIAL PRIMARY,
    team INTEGER REFERENCES teams(id),
    player INTEGER REFERENCES players(id),
    match INTEGER REFERENCES matches(id)
);

CREATE TABLE rankings (
    id SERIAL PRIMARY KEY,
    team INTEGER REFERENCES teams(id),
    position INTEGER UNIQUE NOT NULL
)

CREATE TABLE season_dates (
    id SERIAL PRIMARY KEY,
    season TEXT UNIQUE NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL
);