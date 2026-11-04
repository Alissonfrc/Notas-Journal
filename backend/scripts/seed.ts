import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { Client } from "pg";
import { loadDatabaseConfig } from "../src/config";

export async function seed() {
  const client = new Client(loadDatabaseConfig());
  try {
    await client.connect();
    await client.query("BEGIN");
    try {
      await client.query(await fs.readFile(path.resolve(process.cwd(), "seed.sql"), "utf8"));
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
    console.log("Dados de demonstração disponíveis.");
  } finally { await client.end(); }
}

if (require.main === module) {
  seed().catch((error: Error) => {
    console.error("Falha no seed:", error.message);
    process.exitCode = 1;
  });
}
