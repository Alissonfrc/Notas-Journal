CREATE TABLE tarefas (
    id          SERIAL          PRIMARY KEY,
    titulo           VARCHAR(200) NOT NULL CHECK (length(trim(titulo)) > 0),
    descricao        TEXT NOT NULL DEFAULT '',
    status           VARCHAR(15) NOT NULL DEFAULT 'pendente'
                     CHECK (status IN ('pendente', 'em_andamento', 'concluida')),
    data_prevista    TIMESTAMPTZ,
    data_conclusao   TIMESTAMPTZ,
    horario_lembrete TIME,
    criado_em        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    usuario_id       INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    CHECK ((status = 'concluida') = (data_conclusao IS NOT NULL))
);
CREATE INDEX tarefas_usuario_idx ON tarefas(usuario_id);
