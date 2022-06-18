import { BaseEntity } from './BaseEntity';

type UserFields = {
  username: string;
  age: number;
  hobbies: string[];
};

export class User extends BaseEntity implements UserFields {
  public username: string;

  public age: number;

  public hobbies: string[];

  constructor(fields: UserFields) {
    super();

    const { username, age, hobbies } = fields;

    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}
