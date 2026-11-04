# Notas & Journal

O **Notas & Journal** é uma aplicação de organização pessoal inspirada no [HelloHabit](https://play.google.com/store/apps/details?id=com.studio.hellohabit) e no conceito de **Bullet Journal**. Seu objetivo é ajudar o usuário a organizar tarefas, escrever notas e acompanhar hábitos e metas diárias.

O projeto é desenvolvido para a disciplina de **Programação B — 2026.2**. A solução completa prevê uma API com banco de dados e dois clientes:

- **Web:** para organizar e visualizar tarefas, notas e hábitos.
- **Mobile:** para registrar atividades e acompanhar o progresso no dia a dia.

## Escopo atual: entrega 1

- Modelagem conceitual em UML, com pelo menos cinco entidades.
- Script do banco de dados relacional correspondente ao modelo.
- Login no backend.
- CRUD completo de notas no backend, com documentação da API.

Esta entrega implementa o cadastro de usuários, o login e o CRUD de notas. As cinco entidades estão contempladas no modelo e nas migrations. Os frontends e os CRUDs das demais entidades ficam para as próximas entregas.

## Modelo conceitual

O diagrama editável está em [modelagem-conceitual.drawio](modelagem-conceitual.drawio). Para visualizá-lo ou alterá-lo, abra o arquivo no [diagrams.net](https://app.diagrams.net/).

O modelo contém cinco entidades:

| Entidade | Responsabilidade |
| --- | --- |
| `Usuario` | Representar o usuário, seu nome, e-mail e credencial de acesso. |
| `Habito` | Definir o hábito, sua meta diária, unidade de medida, período e lembrete opcional. |
| `RegistroHabito` | Registrar a data, a quantidade realizada e uma observação opcional sobre um hábito. |
| `Nota` | Guardar título, conteúdo, data de criação e uma imagem opcional. |
| `Tarefa` | Representar uma atividade, seu status, prazo, conclusão e lembrete opcional. |

### Associações

- Um usuário pode ter zero ou vários hábitos, notas e tarefas. Cada um desses itens pertence a exatamente um usuário.
- Um hábito pode ter zero ou vários registros. Cada registro pertence a exatamente um hábito.
- Uma nota pode estar associada a zero ou um hábito. Um hábito pode ter zero ou várias notas. Quando houver essa associação, ambos devem pertencer ao mesmo usuário.

O **hábito** define o objetivo; o **registro do hábito** guarda cada realização. Por exemplo: o hábito “Beber água” pode ter uma meta diária de 2.000 ml e dois registros no mesmo dia, de 500 ml e 300 ml.

A imagem opcional de `Nota` é armazenada como dados binários no PostgreSQL. A senha de `Usuario` é armazenada como hash bcrypt.

## Funcionalidades previstas para as próximas entregas

- CRUD de tarefas, hábitos e registros de hábitos.
- Marcação de tarefas como concluídas.
- Definição de metas diárias e registro de quantidades realizadas.
- Consulta ao histórico de hábitos.
- Lembretes opcionais para hábitos e tarefas.
- Cálculo do percentual diário de uma meta: quantidade registrada no dia dividida pela meta diária, multiplicada por 100.

O cálculo de progresso é a proposta de processamento no backend para a continuidade do trabalho.

## Tecnologias

- **Node.js e TypeScript:** execução com `tsx` durante o desenvolvimento e compilação com `tsc`.
- **Express.js:** rotas e middlewares da API.
- **PostgreSQL e `pg`:** persistência e consultas SQL parametrizadas, sem ORM.
- **`dotenv`:** configuração por variáveis de ambiente.
- **`bcrypt` e `jsonwebtoken`:** hash de senha e autenticação JWT.
- **`swagger-jsdoc` e `swagger-ui-express`:** documentação OpenAPI gerada dos comentários do código.
- **Modelagem:** UML no diagrams.net, em formato `.drawio`.

## Como executar a entrega 1
Guia para me lembrar.

Requisitos: **Node.js 20 ou superior**, npm e **PostgreSQL com a extensão `pgcrypto` disponível** para os dados de demonstração. Execute os comandos de npm dentro da pasta `backend`.

1. Crie um banco vazio no PostgreSQL, usando o pgAdmin ou `psql`:

   ```sql
   CREATE DATABASE notas_journal;
   ```

2. Instale as dependências e copie a configuração de exemplo:

   ```powershell
   cd backend
   npm ci
   Copy-Item .env.example .env
   ```

3. Edite `backend/.env`, informando a conexão do seu banco em `DATABASE_URL`. Gere uma chave para `JWT_SECRET`:

   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   Copie o resultado para `JWT_SECRET` no `.env`. Mantenha `DATABASE_SSL=false` para um PostgreSQL local sem SSL. Para um servidor que exige TLS, use `true` e um certificado confiável. O `.env` não deve ser versionado.

4. Crie as tabelas, carregue os exemplos opcionais e inicie a API:

   ```powershell
   npm run migrate
   npm run seed
   npm run dev
   ```

   As migrations são registradas em `schema_migrations`: executar novamente não recria tabelas. O seed usa `pgcrypto`, como no material do professor, e pode ser repetido sem apagar os dados. A conta usada no seed precisa de permissão para habilitar essa extensão; alternativamente, um administrador pode habilitá-la antes. O seed é opcional, pois também é possível cadastrar usuários pela API.

5. Abra [Swagger](http://localhost:3000/api-docs). A especificação também está disponível em [OpenAPI JSON](http://localhost:3000/api-docs.json).

Para executar o código compilado:

```powershell
npm run build
npm start
```

Mantenha a pasta `src` junto da distribuição, pois o Swagger lê seus comentários JSDoc. Todos os comandos acima devem ser executados na pasta `backend`.

## Rotas da entrega 1

| Método | Rota | Autenticação | Finalidade |
| --- | --- | --- | --- |
| POST | `/api/usuarios` | Pública | Cadastrar usuário com `nome`, `email` e `senha`. |
| POST | `/api/login` | Pública | Receber token usando `email` e `senha`. |
| GET | `/api/notas` | JWT | Listar as notas do usuário autenticado. |
| GET | `/api/notas/:id` | JWT | Consultar uma nota do usuário autenticado. |
| POST | `/api/notas` | JWT | Criar nota. |
| PUT | `/api/notas/:id` | JWT | Substituir os campos editáveis de uma nota. |
| DELETE | `/api/notas/:id` | JWT | Excluir nota, retornando `204` sem corpo. |

### Como testar manualmente no Swagger

1. Cadastre um usuário ou use uma conta do seed: `ana@email.com` / `Ana12345!` ou `bruno@email.com` / `Bruno12345!`.
2. Execute `POST /api/login` e copie o campo `token`.
3. Clique em **Authorize** e cole somente o token.
4. Execute as rotas de notas. No Postman, envie o cabeçalho `Authorization: Bearer SEU_TOKEN`.

Crie uma nota com `POST /api/notas` e copie o `id` retornado. Confira o fluxo:

| Operação | Resultado esperado |
| --- | --- |
| Criar uma nota | `201`, com os dados e o identificador da nota. |
| Listar as notas | `200`, com a nota criada na lista. |
| Consultar a nota pelo ID | `200`, com os dados da nota. |
| Atualizar a nota com `PUT` | `200`, com os campos atualizados. |
| Excluir a nota | `204`, sem corpo de resposta. |
| Consultar o ID após excluir | `404`, nota não encontrada. |
| Acessar notas sem autorização | `401`, autenticação necessária. |

Para conferir o acesso por proprietário, faça login com outro usuário e tente consultar, atualizar ou excluir o ID de uma nota que ainda existe na primeira conta: a resposta deve ser `404`.

Exemplo de corpo para criar ou atualizar uma nota:

```json
{
  "titulo": "Resumo do dia",
  "conteudo": "Estudei TypeScript e organizei minhas tarefas.",
  "habitoId": null,
  "imagem": null
}
```

`titulo` e `conteudo` são obrigatórios; o conteúdo pode ser vazio. `habitoId` e `imagem` são opcionais. Em `PUT`, omitir os campos opcionais remove seus valores. O proprietário é obtido do token, e a data de criação é preservada nas atualizações.

Para associar uma imagem, envie `imagem` como `data:image/png;base64,...`, `data:image/jpeg;base64,...` ou `data:image/webp;base64,...`, com no máximo 2 MB de dados decodificados. Uma nota pode se vincular a um hábito já presente no banco, como o criado pelo seed; o cadastro de hábitos pela API fica para outra entrega.

Erros retornam o formato `{ "error": { "code": "...", "message": "..." } }`, com códigos HTTP `400` para entrada inválida, `401` para falha de autenticação, `404` para nota indisponível, `409` para e-mail duplicado e `413` para corpo acima de 4 MB. Falhas internas retornam `500` sem expor detalhes do banco.

## Organização do repositório

```text
backend/
  migrations/       Scripts das cinco entidades
  scripts/          Execução do seed
  src/
    auth/           Login e middleware JWT
    docs/           Configuração do Swagger
    errors/         AppError e tratamento de erros
    notas/          CRUD com routes, controller, service, repository e entity
    usuarios/       Cadastro e consulta para autenticação
    app.ts          Configuração do Express
    server.ts       Inicialização do servidor
  migrate.ts        Script de execução das migrations
  seed.sql          Dados iniciais do banco
ativ1.md            Registro da atividade inicial, anterior à revisão do modelo
modelagem-conceitual.drawio   Modelo conceitual atual
```

Para a submissão, publique a versão revisada na branch `entrega1` do GitHub e informe o link no SIGAA, conforme o enunciado.
