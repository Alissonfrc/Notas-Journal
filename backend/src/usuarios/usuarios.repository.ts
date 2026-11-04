import { pool } from "../db";
import { Usuario, UsuarioProps } from "./usuarios.entity";

interface UsuarioRow { id: number; nome: string; email: string; senha_hash: string; criado_em: Date }
function fromRow(row: UsuarioRow) {
  return new Usuario({ nome: row.nome, email: row.email, senhaHash: row.senha_hash }, row.id, row.criado_em);
}

export async function findByEmail(email: string) {
  const result = await pool.query<UsuarioRow>("SELECT * FROM usuario WHERE email = $1", [email]);
  return result.rows[0] ? fromRow(result.rows[0]) : null;
}

export async function create(props: UsuarioProps) {
  const result = await pool.query<UsuarioRow>(
    "INSERT INTO usuario (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *",
    [props.nome, props.email, props.senhaHash],
  );
  return fromRow(result.rows[0]);
}
