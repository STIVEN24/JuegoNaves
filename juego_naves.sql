CREATE DATABASE juego_naves;

CREATE TABLE account(
    id_account int NOT NULL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    points INT NOT NULL
);