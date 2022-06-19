import { STATUS_CODE } from './utils/constants';

export class AppError extends Error {
  code: STATUS_CODE;

  constructor({ name, code, message }: { name: string; code: STATUS_CODE; message: string }) {
    super(message);

    this.name = name;
    this.code = code;
  }
}
