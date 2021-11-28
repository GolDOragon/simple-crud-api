import { REPOSITORY_CODES, RepositoryError } from '../helpers/RepositoryError.mjs';
import { Person } from '../models/Person.mjs';

class Repository {
  constructor(entityClass) {
    this.#entity = entityClass;
    this.#name = entityClass.name;
  }

  #items = [];

  #name = '';

  #entity;

  async getAll() {
    return this.items;
  }

  async getOne(id) {
    const item = this.items.find((entity) => entity.id === id);

    if (!item) {
      throw new RepositoryError(`${this.name} doesn't exist'`, REPOSITORY_CODES.NON_EXIST_ENTITY);
    }

    return item;
  }

  async create(item) {
    if (!(item instanceof this.#entity)) {
      throw new RepositoryError('Unknown Entity', REPOSITORY_CODES.INVALID_ENTITY);
    }

    this.items.push(item);
    return item;
  }

  async deleteOne(id) {
    const index = this.items.findIndex((entity) => entity.id === id);

    if (index === -1) {
      throw new RepositoryError(`${this.name} doesn't exist`, REPOSITORY_CODES.NON_EXIST_ENTITY);
    }

    return this.items.splice(index, 1)[0];
  }
}

export const personRepository = new Repository(Person);

// export const repository = {
//   name: 'person',
//   items: [],

//   async getAll() {
//     return this.items;
//   },

//   async getOne(id) {
//     const item = this.items.find((entity) => entity.id === id);

//     if (!item) {
//       throw new Error(`${this.name} doesn't exist`);
//     }

//     return item;
//   },

//   async create(item) {
//     const createdItem = new Person(item);

//     this.items.push(createdItem);

//     return createdItem;
//   },

//   async deleteOne(id) {
//     const index = this.items.findIndex((entity) => entity.id === id);

//     if (index === -1) {
//       throw new Error(`${this.name} doesn't exist`);
//     }

//     return this.items.splice(index, 1)[0];
//   },
// };
