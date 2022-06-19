import { AppError } from '../AppError';
import { STATUS_CODE } from '../utils/constants';

export class ServiceError extends AppError {
  constructor(code: STATUS_CODE, message: string) {
    super({ name: 'ServiceError', code, message });
  }
}
