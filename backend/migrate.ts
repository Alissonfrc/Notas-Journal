import "dotenv/config";
import { Client } from "pg";
import fs from "node:fs/promises";
import path from "node:path";
import { loadDatabaseConfig } from "./src/config";

export async function migrate() {
  const client = new Client(loadDatabaseConfig());
  try {
    await client.connect();
    await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      nome TEXT PRIMARY KEY, aplicada_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    const migrationsDir = path.resolve(process.cwd(), "migrations");
    const files = (await fs.readdir(migrationsDir)).filter((file) => file.endsWith(".sql")).sort();
    for (const file of files) {
      await client.query("BEGIN");
      try {
        await client.query("LOCK TABLE schema_migrations IN EXCLUSIVE MODE");
        const applied = await client.query("SELECT 1 FROM schema_migrations WHERE nome = $1", [file]);
        if (applied.rowCount === 0) {
          await client.query(await fs.readFile(path.join(migrationsDir, file), "utf8"));
          await client.query("INSERT INTO schema_migrations (nome) VALUES ($1)", [file]);
          console.log(`Migration aplicada: ${file}`);
        }
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    }
    console.log("Banco atualizado.");
  } finally { await client.end(); }
}

if (require.main === module) {
  migrate().catch((error: Error) => {
    console.error("Falha nas migrations:", error.message);
    process.exitCode = 1;
  });
}
