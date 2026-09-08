# Atividade 1

## 1. Tabelas definidas inicialmente

- `usuario`:armazena os usuários do sistema.
- `notas`:  armazena as notas criadas pelos usuários.
- `habitos`:armazena os hábitos que os usuários desejam acompanhar.
- `tarefas`:armazena as tarefas que os usuários desejam realizar.

## 2. Migrations

Sim. Foram utilizadas quatro migrations:

1. `001_criar_usuario.sql`: cria a tabela `usuario`.
2. `002_criar_notas.sql`: cria a tabela `notas` e relaciona cada nota a um usuário.
3. `003_criar_habitos.sql`: cria a tabela `habitos` e relaciona com o usuário.
4. `004_criar_tarefas.sql`: cria a tabela `tarefas` e relaciona com o usuário.

## 3. Caminho do arquivo de seed

O arquivo que gera a seed do banco está em `backend/seed.sql`.

## 4. Endpoints iniciais

Inicialmente serão implementados os endpoints de usuários e os endpoints CRUD de tarefas, nesta ordem:

- `POST /usuarios`: cria um novo usuário.
- `GET /usuarios/:id`: busca um usuário pelo identificador.
- `GET /tarefas`: lista todas as tarefas.
- `GET /tarefas/:id`: busca uma tarefa pelo identificador.
- `POST /tarefas`: cria uma nova tarefa.
- `PUT /tarefas/:id`: atualiza uma tarefa existente.
- `DELETE /tarefas/:id`: remove uma tarefa.

Os endpoints de usuários devem ser implementados primeiro porque a tabela `tarefas` possui a coluna `usuario_id` como chave estrangeira para a tabela `usuario`. Assim, é necessário criar um usuário antes de cadastrar uma tarefa, garantindo que ela seja vinculada a um registro válido e evitando erros de integridade no banco. 

## 5. Framework utilizado

No estado atual do projeto, não está sendo utilizado um framework para escrever os endpoints da API. O projeto será desenvolvido utilizando o framework Express.js, executando sobre Node.js.
