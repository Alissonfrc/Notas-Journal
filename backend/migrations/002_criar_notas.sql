CREATE TABLE notas(
    id          SERIAL          PRIMARY KEY,
    titulo      VARCHAR(200)    NOT NULL,
    conteudo    TEXT,
    criado_em   TIMESTAMP       NOT NULL DEFAULT NOW(),
    usuario_id     INTEGER      NOT NULL REFERENCES usuario(id)
);