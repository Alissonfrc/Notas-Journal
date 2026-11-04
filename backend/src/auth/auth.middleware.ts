import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { loadConfig } from "../config";
import { AppError } from "../errors/AppError";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const match = /^Bearer ([^\s]+)$/i.exec(req.headers.authorization ?? "");
  if (!match) return next(new AppError("Envie o token no formato Bearer.", 401, "UNAUTHORIZED"));
  const secret = loadConfig().jwtSecret;
  try {
    const decoded = jwt.verify(match[1], secret, { algorithms: ["HS256"] });
    if (typeof decoded === "string" || !Number.isInteger(decoded.id) || decoded.id < 1 ||
        decoded.id > 2147483647 || typeof decoded.email !== "string") {
      throw new Error("Payload inválido");
    }
    req.user = { id: decoded.id as number, email: decoded.email };
    next();
  } catch {
    next(new AppError("Token inválido ou expirado.", 401, "UNAUTHORIZED"));
  }
}
