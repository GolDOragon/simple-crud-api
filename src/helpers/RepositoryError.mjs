export class RepositoryError extends Error {
  constructor(message, code) {
    super(message, code);
    this.name = 'RepositoryError';
    this.code = code;

    this.logger();
  }

  logger() {
    console.log(this.code, ':', this.message); // eslint-disable-line no-console
  }
}

export const REPOSITORY_CODES = {
  NON_EXIST_ENTITY: 1001,
  INVALID_ENTITY: 1010,
};
