import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError";
import * as repository from "./usuarios.repository";

export async function create(nome: string, email: string, senha: string) {
  try {
    const senhaHash = await bcrypt.hash(senha, 12);
    return await repository.create({ nome, email, senhaHash });
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      throw new AppError("Este e-mail já está cadastrado.", 409, "EMAIL_ALREADY_EXISTS");
    }
    throw error;
  }
}
