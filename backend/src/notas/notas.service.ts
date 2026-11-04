import { AppError } from "../errors/AppError";
import { Nota, NotaProps } from "./notas.entity";
import * as repository from "./notas.repository";

const notFound = () => new AppError("Nota não encontrada.", 404, "NOT_FOUND");
export const listAll = repository.findAll;

export async function getById(id: number, usuarioId: number) {
  const nota = await repository.getById(id, usuarioId);
  if (!nota) throw notFound();
  return nota;
}
async function checkHabito(props: NotaProps) {
  if (props.habitoId !== null && !await repository.ownsHabito(props.habitoId, props.usuarioId)) {
    throw new AppError("Hábito não encontrado para este usuário.", 400, "INVALID_HABITO");
  }
}
async function persist(operation: () => Promise<Nota | null>) {
  try {
    const nota = await operation();
    if (!nota) throw notFound();
    return nota;
  } catch (error) {
    if ((error as { code?: string }).code === "23503") {
      throw new AppError("Usuário ou hábito associado não está disponível.", 400, "INVALID_REFERENCE");
    }
    throw error;
  }
}
export async function create(props: NotaProps) {
  const nota = new Nota(props);
  await checkHabito(props);
  return persist(() => repository.save(nota));
}
export async function update(id: number, props: NotaProps) {
  await getById(id, props.usuarioId);
  const nota = new Nota(props);
  await checkHabito(props);
  return persist(() => repository.update(id, nota));
}
export async function remove(id: number, usuarioId: number) {
  if (!await repository.remove(id, usuarioId)) throw notFound();
}
