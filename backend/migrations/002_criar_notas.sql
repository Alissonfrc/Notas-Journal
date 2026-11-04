CREATE TABLE notas(
    id          SERIAL          PRIMARY KEY,
    titulo      VARCHAR(200)    NOT NULL CHECK (length(trim(titulo)) > 0),
    conteudo    TEXT            NOT NULL,
    imagem      BYTEA,
    imagem_tipo VARCHAR(20),
    criado_em   TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    usuario_id  INTEGER         NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    habito_id   INTEGER,
    CONSTRAINT notas_imagem_valida CHECK (
        (imagem IS NULL AND imagem_tipo IS NULL) OR
        (imagem IS NOT NULL AND imagem_tipo IS NOT NULL AND
         imagem_tipo IN ('image/png', 'image/jpeg', 'image/webp') AND
         octet_length(imagem) BETWEEN 1 AND 2097152)
    )
);
CREATE INDEX notas_usuario_idx ON notas(usuario_id);
