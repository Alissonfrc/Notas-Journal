CREATE TABLE usuario (
    id          SERIAL          PRIMARY KEY,
    nome        VARCHAR(100)    NOT NULL,
    email       VARCHAR(100)    NOT NULL UNIQUE,
    criado_em   TIMESTAMP       NOT NULL DEFAULT NOW()
);