import { Request, Response, NextFunction } from "express";
import { objectBody, text } from "../validation";
import { AppError } from "../errors/AppError";
import * as service from "./auth.service";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const body = objectBody(req.body);
    const email = text(body.email, "email", 200).trim().toLowerCase();
    const senha = text(body.senha, "senha", 72);
    if (Buffer.byteLength(senha) > 72) throw new AppError("Senha excede 72 bytes UTF-8.");
    res.json(await service.login(email, senha));
  } catch (error) { next(error); }
}
