import { v4 as uuid } from 'uuid';

export class Entity {
  constructor() {
    this.id = uuid();
  }
}
