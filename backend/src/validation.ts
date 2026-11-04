import { AppError } from "./errors/AppError";

export function objectBody(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new AppError("Envie um objeto JSON no corpo da requisição.");
  }
  return value as Record<string, unknown>;
}

export function text(value: unknown, field: string, max: number, allowEmpty = false): string {
  if (typeof value !== "string" || (!allowEmpty && !value.trim()) || value.length > max) {
    throw new AppError(`${field} deve ser um texto ${allowEmpty ? "" : "não vazio "}com até ${max} caracteres.`);
  }
  return value;
}

export function positiveId(value: unknown): number {
  if ((typeof value !== "number" && typeof value !== "string") || !/^[1-9]\d*$/.test(String(value))) {
    throw new AppError("ID deve ser um número inteiro positivo.");
  }
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id > 2147483647) throw new AppError("ID inválido.");
  return id;
}
