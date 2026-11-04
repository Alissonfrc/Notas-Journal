import path from "node:path";
import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  failOnErrors: true,
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Notas & Journal — Entrega 1",
      version: "1.0.0",
      description: "Cadastro, login e CRUD de notas. Faça login e informe o JWT em Authorize para testar as notas.",
    },
    servers: [{ url: "/", description: "Servidor atual" }],
    components: {
      securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
      schemas: {
        Erro: {
          type: "object",
          properties: { error: { type: "object", properties: { code: { type: "string" }, message: { type: "string" } } } },
        },
      },
      responses: Object.fromEntries([
        ["BadRequest", "Dados inválidos"], ["Unauthorized", "Credenciais ou token inválidos ou ausentes"],
        ["NotFound", "Nota não encontrada ou pertencente a outro usuário"],
      ].map(([name, description]) => [name, {
        description,
        content: { "application/json": { schema: { $ref: "#/components/schemas/Erro" } } },
      }])),
    },
  },
  // O código-fonte acompanha a distribuição para preservar os comentários JSDoc.
  apis: [path.resolve(process.cwd(), "src/**/*.routes.ts").replace(/\\/g, "/"),
         path.resolve(process.cwd(), "src/**/*.controller.ts").replace(/\\/g, "/")],
});
