import { ErrorRequestHandler } from "express";
import { AppError } from "./AppError";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: { code: err.code, message: err.message } });
    return;
  }
  if (err?.type === "entity.parse.failed") {
    res.status(400).json({ error: { code: "BAD_REQUEST", message: "JSON inválido." } });
    return;
  }
  if (err?.type === "entity.too.large") {
    res.status(413).json({ error: { code: "PAYLOAD_TOO_LARGE", message: "Corpo da requisição excede 4 MB." } });
    return;
  }
  console.error("Erro interno:", err instanceof Error ? err.message : "Erro desconhecido");
  res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Ocorreu um erro interno no servidor." } });
};
