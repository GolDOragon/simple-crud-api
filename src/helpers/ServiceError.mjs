export class ServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;

    this.logger();
  }

  logger() {
    console.log(this.code, ':', this.message); // eslint-disable-line no-console
  }
}

export const SERVICE_ERROR_CODES = {
  BAD_REQUEST: 400,
  INVALID_ID: 400,
};
