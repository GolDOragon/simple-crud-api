import { generateId } from '../utils/UUID';

export abstract class BaseEntity {
  id: string;

  protected constructor() {
    this.id = generateId();
  }
}
