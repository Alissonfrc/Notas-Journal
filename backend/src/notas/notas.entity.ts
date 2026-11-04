import { AppError } from "../errors/AppError";

export interface NotaProps {
  titulo: string;
  conteudo: string;
  usuarioId: number;
  habitoId: number | null;
  imagem: Buffer | null;
  imagemTipo: string | null;
}

export class Nota {
  constructor(
    private readonly props: NotaProps,
    private readonly _id = 0,
    private readonly _criadoEm = new Date(),
  ) {
    if (!props.titulo.trim() || props.titulo.length > 200) throw new AppError("Título inválido.");
  }
  get id() { return this._id; }
  get titulo() { return this.props.titulo; }
  get conteudo() { return this.props.conteudo; }
  get usuarioId() { return this.props.usuarioId; }
  get habitoId() { return this.props.habitoId; }
  get imagem() { return this.props.imagem; }
  get imagemTipo() { return this.props.imagemTipo; }
  get criadoEm() { return this._criadoEm; }

  toJSON() {
    return {
      id: this.id, titulo: this.titulo, conteudo: this.conteudo,
      usuarioId: this.usuarioId, habitoId: this.habitoId, criadoEm: this.criadoEm,
      imagem: this.imagem ? `data:${this.imagemTipo};base64,${this.imagem.toString("base64")}` : null,
    };
  }
}
