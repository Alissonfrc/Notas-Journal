-- Dados de demonstração. Não apaga registros existentes.
-- Login: ana@email.com / Ana12345! ou bruno@email.com / Bruno12345!
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuario (nome, email, senha_hash) VALUES
    ('Ana Silva', 'ana@email.com', crypt('Ana12345!', gen_salt('bf', 12))),
    ('Bruno Costa', 'bruno@email.com', crypt('Bruno12345!', gen_salt('bf', 12)))
ON CONFLICT (email) DO NOTHING;

INSERT INTO habitos (titulo, descricao, tipo, unidade_medida, meta_diaria, data_inicio, usuario_id)
SELECT 'Beber água', 'Beber 2.000 ml de água por dia', 'construir', 'ml', 2000, CURRENT_DATE, u.id
FROM usuario u WHERE u.email = 'ana@email.com'
AND NOT EXISTS (SELECT 1 FROM habitos h WHERE h.usuario_id = u.id AND h.titulo = 'Beber água');

INSERT INTO habitos (titulo, descricao, tipo, unidade_medida, meta_diaria, data_inicio, usuario_id)
SELECT 'Ler', 'Ler por 20 minutos diariamente', 'construir', 'minutos', 20, CURRENT_DATE, u.id
FROM usuario u WHERE u.email = 'bruno@email.com'
AND NOT EXISTS (SELECT 1 FROM habitos h WHERE h.usuario_id = u.id AND h.titulo = 'Ler');

INSERT INTO notas (titulo, conteudo, usuario_id, habito_id)
SELECT 'Resumo do dia', 'Estou acompanhando minha hidratação.', u.id, h.id
FROM usuario u JOIN habitos h ON h.usuario_id = u.id
WHERE u.email = 'ana@email.com' AND h.titulo = 'Beber água'
AND NOT EXISTS (SELECT 1 FROM notas n WHERE n.usuario_id = u.id AND n.titulo = 'Resumo do dia');

INSERT INTO notas (titulo, conteudo, usuario_id)
SELECT 'Planejamento', 'Separar um horário para estudar.', u.id
FROM usuario u WHERE u.email = 'bruno@email.com'
AND NOT EXISTS (SELECT 1 FROM notas n WHERE n.usuario_id = u.id AND n.titulo = 'Planejamento');

INSERT INTO tarefas (titulo, descricao, usuario_id)
SELECT 'Estudar TypeScript', 'Revisar os exemplos do TamoJunto.', u.id
FROM usuario u WHERE u.email = 'ana@email.com'
AND NOT EXISTS (SELECT 1 FROM tarefas t WHERE t.usuario_id = u.id AND t.titulo = 'Estudar TypeScript');

INSERT INTO registros_habitos (data_hora, quantidade, observacao, habito_id)
SELECT CURRENT_DATE + TIME '09:00', 500, 'Registro de demonstração', h.id
FROM habitos h JOIN usuario u ON u.id = h.usuario_id
WHERE u.email = 'ana@email.com' AND h.titulo = 'Beber água'
AND NOT EXISTS (SELECT 1 FROM registros_habitos r WHERE r.habito_id = h.id AND r.observacao = 'Registro de demonstração');
