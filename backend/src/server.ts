import { app } from "./app";
import { loadConfig } from "./config";
import { pool } from "./db";

async function main() {
  const config = loadConfig();
  await pool.query("SELECT 1");
  const server = app.listen(config.port, () => {
    console.log(`API: http://localhost:${config.port} | Swagger: http://localhost:${config.port}/api-docs`);
  });
  const shutdown = () => {
    server.close(() => { void pool.end(); });
  };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

main().catch(async (error: Error) => {
  console.error("Falha ao iniciar a API:", error.message);
  await pool.end();
  process.exitCode = 1;
});
