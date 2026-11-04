CREATE TABLE usuario (
    id          SERIAL          PRIMARY KEY,
    nome        VARCHAR(100)    NOT NULL,
    email       VARCHAR(200)    NOT NULL UNIQUE CHECK (email = lower(email)),
    senha_hash  VARCHAR(255)    NOT NULL,
    criado_em   TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);
