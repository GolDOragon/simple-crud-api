import { REPOSITORY_CODES, RepositoryError } from '../helpers/RepositoryError.mjs';

export class Repository {
  constructor(entityClass) {
    this.#entity = entityClass;
    this.#name = entityClass.name;
    this.#toResponse = entityClass.toResponse;
  }

  #items = [];

  #entity;

  #name;

  #toResponse;

  async getAll() {
    return this.#items.map((item) => this.#toResponse(item));
  }

  async getOne(id) {
    const item = this.#items.find((entity) => entity.id === id);

    if (!item) {
      throw new RepositoryError(`${this.#name} doesn't exist`, REPOSITORY_CODES.NON_EXIST_ENTITY);
    }

    return this.#toResponse(item);
  }

  async create(item) {
    if (!(item instanceof this.#entity)) {
      throw new RepositoryError('Unknown Entity', REPOSITORY_CODES.INVALID_ENTITY);
    }

    this.#items.push(item);
    return this.#toResponse(item);
  }

  async deleteOne(id) {
    const index = this.#items.findIndex((entity) => entity.id === id);

    if (index === -1) {
      throw new RepositoryError(`${this.#name} doesn't exist`, REPOSITORY_CODES.NON_EXIST_ENTITY);
    }

    const deletedItem = this.#items.splice(index, 1)[0];

    return this.#toResponse(deletedItem);
  }

  async updateOne(id, newFields) {
    const index = this.#items.findIndex((entity) => entity.id === id);

    if (index === -1) {
      throw new RepositoryError(`${this.#name} doesn't exist`, REPOSITORY_CODES.NON_EXIST_ENTITY);
    }

    this.#items[index] = {
      ...this.#items[index],
      ...newFields,
    };

    return this.#toResponse(this.#items[index]);
  }
}
