CREATE TABLE habitos(
    id          SERIAL          PRIMARY KEY,
    titulo      VARCHAR(200)    NOT NULL,
    conteudo    TEXT,
    tipo        INTEGER         NOT NULL,-- 1. checavel; 2. quantificavel;
    status      FLOAT           NOT NULL,
    unid_medida VARCHAR(10),
    notificacao TIMESTAMP,
    data        TIMESTAMP       NOT NULL,-- dia
    criado_em   TIMESTAMP       NOT NULL DEFAULT NOW(),
    usuario_id     INTEGER         NOT NULL REFERENCES usuario(id)
);