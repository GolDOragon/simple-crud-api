export class Person {
  /**
   * Simple person
   * @param {string} name
   * @param {number} age
   * @param {string[]} hobbies
   */
  constructor({ name, age, hobbies }) {
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
}
