TRUNCATE TABLE tarefas, habitos, notas, usuario RESTART IDENTITY CASCADE;

INSERT INTO usuario (nome, email) VALUES
    ('Alisson', 'alisson@email.com'),
    ('Maria', 'maria@email.com'),
    ('João', 'joao@email.com');

INSERT INTO notas (titulo, conteudo, usuario_id) VALUES
    ('Resumo do dia', 'Estudei SQL e organizei tarefas.', 1),
    ('Ideias de projeto', 'Criar dashboard para acompanhar hábitos.', 2),
    ('Lista de compras', 'Leite, pão, café, frutas.', 3);

INSERT INTO habitos (titulo, conteudo, tipo, status, unid_medida, notificacao, data, usuario_id) VALUES
    ('Beber água', 'Tomar 2L de água ao longo do dia', 2, 1.5, 'L', '2026-09-08 08:00:00', '2026-09-08 00:00:00', 1),
    ('Ler 20 minutos', 'Leitura diária de desenvolvimento pessoal', 1, 1, 'vezes', '2026-09-08 21:00:00', '2026-09-08 00:00:00', 1),
    ('Caminhar', 'Caminhada leve pela tarde', 2, 0.75, 'km', '2026-09-08 18:00:00', '2026-09-08 00:00:00', 2);

INSERT INTO tarefas (titulo, conteudo, status, notificacao, data, usuario_id) VALUES
    ('Finalizar API', 'Concluir endpoints de notas e autenticação', 2, '2026-09-09 09:00:00', '2026-09-10 23:59:00', 1),
    ('Revisar design', 'Ajustar layout do dashboard e contraste', 1, '2026-09-08 16:00:00', '2026-09-08 12:00:00', 2),
    ('Organizar estudos', 'Separar materiais de SQL e Node', 0, '2026-09-08 19:00:00', '2026-09-09 08:00:00', 3);
