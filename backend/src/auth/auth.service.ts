import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loadConfig } from "../config";
import { AppError } from "../errors/AppError";
import * as users from "../usuarios/usuarios.repository";

export async function login(email: string, senha: string) {
  const user = await users.findByEmail(email);
  if (!user || !(await bcrypt.compare(senha, user.senhaHash))) {
    throw new AppError("E-mail ou senha incorretos.", 401, "UNAUTHORIZED");
  }
  const token = jwt.sign({ id: user.id, email: user.email }, loadConfig().jwtSecret, {
    algorithm: "HS256", expiresIn: "2h",
  });
  return { token, usuario: user.toJSON() };
}
