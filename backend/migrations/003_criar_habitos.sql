CREATE TABLE habitos(
    id          SERIAL          PRIMARY KEY,
    titulo           VARCHAR(200) NOT NULL CHECK (length(trim(titulo)) > 0),
    descricao        TEXT NOT NULL DEFAULT '',
    tipo             VARCHAR(15) NOT NULL CHECK (tipo IN ('construir', 'abandonar')),
    status           VARCHAR(15) NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'arquivado')),
    unidade_medida   VARCHAR(30) NOT NULL,
    meta_diaria      NUMERIC(12, 3) NOT NULL CHECK (meta_diaria > 0),
    data_inicio      DATE NOT NULL,
    data_fim         DATE CHECK (data_fim >= data_inicio),
    horario_lembrete TIME,
    criado_em        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    usuario_id       INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    UNIQUE (id, usuario_id)
);
CREATE INDEX habitos_usuario_idx ON habitos(usuario_id);

-- A chave composta impede vincular uma nota a um hábito de outro usuário.
ALTER TABLE notas ADD CONSTRAINT notas_habito_usuario_fk
    FOREIGN KEY (habito_id, usuario_id) REFERENCES habitos(id, usuario_id);
