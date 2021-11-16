DROP DATABASE IF EXISTS medical_center
CREATE DATABASE medical_center

\c medical_center

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    field TEXT NOT NULL,
    number_of_patients INTEGER,
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    has_insurance BOOLEAN NOT NULL DEFAULT false,
);

CREATE TABLE diagnosis (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE doctors_patients (
    id SERIAL PRIMARY KEY,
    doctor INTEGER REFERENCES doctors(id),
    patient INTEGER REFERENCES patients(id),
    diagnosis INTEGER REFERENCES diagnosis(id)
);

CREATE INDEX patients_index ON patients(name);