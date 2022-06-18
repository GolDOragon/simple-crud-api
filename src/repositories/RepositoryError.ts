import { AppError } from '../AppError';
import { STATUS_CODE } from '../utils/constants';

export class RepositoryError extends AppError {
  constructor(code: STATUS_CODE, message: string) {
    super({
      name: 'RepositoryError',
      code,
      message,
    });
  }
}
