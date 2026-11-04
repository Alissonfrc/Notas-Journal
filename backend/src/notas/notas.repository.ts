import { pool } from "../db";
import { Nota } from "./notas.entity";

interface NotaRow {
  id: number; titulo: string; conteudo: string; usuario_id: number;
  habito_id: number | null; imagem: Buffer | null; imagem_tipo: string | null; criado_em: Date;
}
function fromRow(row: NotaRow) {
  return new Nota({
    titulo: row.titulo, conteudo: row.conteudo, usuarioId: row.usuario_id,
    habitoId: row.habito_id, imagem: row.imagem, imagemTipo: row.imagem_tipo,
  }, row.id, row.criado_em);
}

export async function findAll(usuarioId: number) {
  const result = await pool.query<NotaRow>("SELECT * FROM notas WHERE usuario_id = $1 ORDER BY criado_em DESC, id DESC", [usuarioId]);
  return result.rows.map(fromRow);
}
export async function getById(id: number, usuarioId: number) {
  const result = await pool.query<NotaRow>("SELECT * FROM notas WHERE id = $1 AND usuario_id = $2", [id, usuarioId]);
  return result.rows[0] ? fromRow(result.rows[0]) : null;
}
export async function save(nota: Nota) {
  const result = await pool.query<NotaRow>(
    `INSERT INTO notas (titulo, conteudo, usuario_id, habito_id, imagem, imagem_tipo)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [nota.titulo, nota.conteudo, nota.usuarioId, nota.habitoId, nota.imagem, nota.imagemTipo],
  );
  return fromRow(result.rows[0]);
}
export async function update(id: number, nota: Nota) {
  const result = await pool.query<NotaRow>(
    `UPDATE notas SET titulo = $1, conteudo = $2, habito_id = $3, imagem = $4, imagem_tipo = $5
     WHERE id = $6 AND usuario_id = $7 RETURNING *`,
    [nota.titulo, nota.conteudo, nota.habitoId, nota.imagem, nota.imagemTipo, id, nota.usuarioId],
  );
  return result.rows[0] ? fromRow(result.rows[0]) : null;
}
export async function remove(id: number, usuarioId: number) {
  const result = await pool.query("DELETE FROM notas WHERE id = $1 AND usuario_id = $2", [id, usuarioId]);
  return result.rowCount === 1;
}
export async function ownsHabito(id: number, usuarioId: number) {
  const result = await pool.query("SELECT 1 FROM habitos WHERE id = $1 AND usuario_id = $2", [id, usuarioId]);
  return result.rowCount === 1;
}
