import { BaseEntity } from '../models/BaseEntity';
import { IClass } from '../typing/Interfaces';
import { STATUS_CODE } from '../utils/constants';
import { RepositoryError } from './RepositoryError';

export class Repository<TEntity extends BaseEntity> {
  private items: TEntity[] = [];

  private readonly itemConstructor;

  constructor(entityClass: IClass<TEntity>) {
    this.itemConstructor = entityClass;
  }

  async getAll() {
    return this.items;
  }

  async getOne(id: string) {
    return this.items.find((item) => item.id === id);
  }

  async create(item: Omit<TEntity, 'id'>) {
    const newItem = new this.itemConstructor(item);
    this.items.push(newItem);

    return newItem;
  }

  async update(id: string, newFields: Omit<TEntity, 'id'>) {
    const index = this.items.findIndex((entity) => entity.id === id);

    const entity = this.items[index];

    if (!entity) {
      throw new RepositoryError(STATUS_CODE.NOT_FOUND, "Entity doesn't exist");
    }

    this.items[index] = {
      ...entity,
      ...newFields,
    };

    return this.items[index];
  }

  async delete(id: string) {
    const index = this.items.findIndex((entity) => entity.id === id);

    const entity = this.items[index];

    if (!entity) {
      throw new RepositoryError(STATUS_CODE.NOT_FOUND, "Entity doesn't exist");
    }

    this.items = this.items.filter((item) => item.id !== id);

    return entity;
  }
}
