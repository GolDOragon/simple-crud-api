import { AppError } from '../AppError';
import { STATUS_CODE } from '../utils/constants';

export class ControllerError extends AppError {
  constructor(code: STATUS_CODE, message: string) {
    super({
      name: 'ControllerError',
      code,
      message,
    });
  }
}
