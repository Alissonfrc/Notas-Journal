CREATE TABLE registros_habitos (
    id          SERIAL PRIMARY KEY,
    data_hora   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    quantidade  NUMERIC(12, 3) NOT NULL CHECK (quantidade > 0),
    observacao  TEXT,
    habito_id   INTEGER NOT NULL REFERENCES habitos(id) ON DELETE CASCADE
);
CREATE INDEX registros_habitos_data_idx ON registros_habitos(habito_id, data_hora);
