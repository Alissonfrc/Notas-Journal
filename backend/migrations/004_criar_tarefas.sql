CREATE TABLE tarefas (
    id          SERIAL          PRIMARY KEY,
    titulo      VARCHAR(200)    NOT NULL,
    conteudo    TEXT,
    status      INTEGER         NOT NULL,-- não comecei, comecei, feito...
    notificacao TIMESTAMP,
    data        TIMESTAMP, -- prazo
    criado_em   TIMESTAMP       NOT NULL DEFAULT NOW(),
    usuario_id     INTEGER         NOT NULL REFERENCES usuario(id)
);