import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { objectBody, positiveId, text } from "../validation";
import { NotaProps } from "./notas.entity";
import * as service from "./notas.service";

function parseImage(value: unknown) {
  if (value === undefined || value === null) return { imagem: null, imagemTipo: null };
  if (typeof value !== "string") throw new AppError("imagem deve ser uma data URI em base64 ou null.");
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!match) throw new AppError("Envie imagem PNG, JPEG ou WebP como data URI base64.");
  const imagem = Buffer.from(match[2], "base64");
  if (imagem.length === 0 || imagem.length > 2 * 1024 * 1024 || imagem.toString("base64") !== match[2]) {
    throw new AppError("A imagem deve conter base64 válido e ter no máximo 2 MB.");
  }
  const type = match[1];
  const valid = type === "image/png" ? imagem.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"))
    : type === "image/jpeg" ? imagem.subarray(0, 3).equals(Buffer.from("ffd8ff", "hex"))
    : imagem.subarray(0, 4).toString() === "RIFF" && imagem.subarray(8, 12).toString() === "WEBP";
  if (!valid) throw new AppError("O conteúdo da imagem não corresponde ao formato informado.");
  return { imagem, imagemTipo: type };
}

function props(req: Request): NotaProps {
  const body = objectBody(req.body);
  return {
    titulo: text(body.titulo, "titulo", 200).trim(),
    conteudo: text(body.conteudo, "conteudo", 100000, true),
    usuarioId: req.user!.id,
    habitoId: body.habitoId === undefined || body.habitoId === null ? null : positiveId(body.habitoId),
    ...parseImage(body.imagem),
  };
}

/**
 * @swagger
 * components:
 *   schemas:
 *     NotaEntrada:
 *       type: object
 *       required: [titulo, conteudo]
 *       description: O usuário é obtido do token. PUT substitui os campos editáveis; omitir imagem ou habitoId remove esses valores.
 *       properties:
 *         titulo: { type: string, minLength: 1, maxLength: 200, example: Resumo do dia }
 *         conteudo: { type: string, maxLength: 100000, example: Estudei TypeScript e organizei minhas tarefas. }
 *         habitoId:
 *           type: [integer, 'null']
 *           minimum: 1
 *           description: Hábito do mesmo usuário; opcional
 *           example: null
 *         imagem:
 *           type: [string, 'null']
 *           description: Data URI base64 PNG, JPEG ou WebP de até 2 MB; opcional
 *           example: null
 *     Nota:
 *       allOf:
 *         - $ref: '#/components/schemas/NotaEntrada'
 *         - type: object
 *           required: [id, usuarioId, criadoEm]
 *           properties:
 *             id: { type: integer }
 *             usuarioId: { type: integer }
 *             criadoEm: { type: string, format: date-time }
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.listAll(req.user!.id)); }
  catch (error) { next(error); }
}
export async function getById(req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.getById(positiveId(req.params.id), req.user!.id)); }
  catch (error) { next(error); }
}
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const nota = await service.create(props(req));
    res.location(`/api/notas/${nota.id}`).status(201).json(nota);
  } catch (error) { next(error); }
}
export async function update(req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.update(positiveId(req.params.id), props(req))); }
  catch (error) { next(error); }
}
export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(positiveId(req.params.id), req.user!.id);
    res.status(204).send();
  } catch (error) { next(error); }
}
