import { v4 as uuid } from 'uuid';
import { Entity } from './Entity.mjs';

export class Person extends Entity {
  /**
   * Simple person
   * @param {string} name
   * @param {number} age
   * @param {string[]} hobbies
   */
  constructor(properties) {
    super();

    if (!Person.isValidArgs(properties)) {
      throw new Error('Invalid properties');
    }

    const { name, age, hobbies } = properties;

    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }

  static isValidArgs({ name, age, hobbies }) {
    return (
      typeof name === 'string' &&
      typeof age === 'number' &&
      age > 0 &&
      Array.isArray(hobbies) &&
      hobbies.every((hobby) => typeof hobby === 'string')
    );
  }

  static toResponse({ name, age, hobbies, id }) {
    return {
      id,
      name,
      age,
      hobbies,
    };
  }
}
