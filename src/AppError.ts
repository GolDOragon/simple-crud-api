export class AppError extends Error {
  code: number;

  constructor({ name, code, message }: { name: string; code: number; message: string }) {
    super(message);

    this.name = name;
    this.code = code;
  }
}
