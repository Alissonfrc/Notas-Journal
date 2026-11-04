import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { objectBody, text } from "../validation";
import * as service from "./usuarios.service";

/**
 * @swagger
 * components:
 *   schemas:
 *     Cadastro:
 *       type: object
 *       required: [nome, email, senha]
 *       properties:
 *         nome: { type: string, minLength: 1, maxLength: 100, example: Ana Silva }
 *         email: { type: string, format: email, maxLength: 200, example: ana@email.com }
 *         senha: { type: string, format: password, minLength: 8, description: Entre 8 caracteres e 72 bytes UTF-8, example: Ana12345! }
 *     Usuario:
 *       type: object
 *       required: [id, nome, email, criadoEm]
 *       properties:
 *         id: { type: integer }
 *         nome: { type: string }
 *         email: { type: string, format: email }
 *         criadoEm: { type: string, format: date-time }
 */
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const body = objectBody(req.body);
    const nome = text(body.nome, "nome", 100).trim();
    const email = text(body.email, "email", 200).trim().toLowerCase();
    const senha = text(body.senha, "senha", 72);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new AppError("E-mail inválido.");
    if (senha.length < 8 || Buffer.byteLength(senha, "utf8") > 72) {
      throw new AppError("A senha deve ter no mínimo 8 caracteres e no máximo 72 bytes UTF-8.");
    }
    res.status(201).json(await service.create(nome, email, senha));
  } catch (error) { next(error); }
}
