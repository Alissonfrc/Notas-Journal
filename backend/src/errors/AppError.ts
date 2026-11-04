export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 400,
    public readonly code = "BAD_REQUEST",
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
