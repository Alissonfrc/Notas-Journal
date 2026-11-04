import { Pool } from "pg";
import { loadDatabaseConfig } from "./config";

export const pool = new Pool(loadDatabaseConfig());
pool.on("error", (err) => console.error("Erro na conexão ociosa com o banco:", err.message));
