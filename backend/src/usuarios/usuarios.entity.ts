export interface UsuarioProps {
  nome: string;
  email: string;
  senhaHash: string;
}

export class Usuario {
  constructor(
    private readonly props: UsuarioProps,
    private readonly _id = 0,
    private readonly _criadoEm = new Date(),
  ) {}

  get id() { return this._id; }
  get nome() { return this.props.nome; }
  get email() { return this.props.email; }
  get senhaHash() { return this.props.senhaHash; }
  get criadoEm() { return this._criadoEm; }

  toJSON() {
    return { id: this.id, nome: this.nome, email: this.email, criadoEm: this.criadoEm };
  }
}
