import "dotenv/config";

export function loadDatabaseConfig() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL não está definida. Configure backend/.env.");
  return {
    connectionString: databaseUrl,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: true } : false as const,
    connectionTimeoutMillis: 5000,
  };
}

export function loadConfig() {
  const database = loadDatabaseConfig();
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || Buffer.byteLength(jwtSecret) < 32) {
    throw new Error("JWT_SECRET deve conter pelo menos 32 bytes. Gere uma chave aleatória para backend/.env.");
  }
  const port = Number(process.env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT inválida.");
  return { database, jwtSecret, port };
}
