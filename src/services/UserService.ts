import { User } from '../models/UserModel';
import { Repository } from '../repositories/Repository';
import { userRepository } from '../repositories/UserRepository';
import { STATUS_CODE } from '../utils/constants';
import { ServiceError } from './ServiceError';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = userRepository;
  }

  async getUsers() {
    return this.userRepository.getAll();
  }

  async getUser(id: string) {
    return this.userRepository.getOne(id);
  }

  async createUser(userFields: Record<string, unknown>) {
    if (!this.isValidUser(userFields)) {
      throw new ServiceError(STATUS_CODE.BAD_REQUEST, 'Invalid fields');
    }

    return this.userRepository.create(userFields);
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id);
  }

  async updateUser(id: string, newFields: Record<string, unknown>) {
    const oldUser = await this.userRepository.getOne(id);

    if (!oldUser) {
      throw new ServiceError(STATUS_CODE.BAD_REQUEST, "Entity doesn't exist");
    }

    const updatedUser = {
      ...oldUser,
      ...newFields,
    };

    if (!this.isValidUser(updatedUser)) {
      throw new ServiceError(STATUS_CODE.BAD_REQUEST, 'Invalid fields');
    }

    return this.userRepository.update(id, updatedUser);
  }

  private isValidUser(fields: Record<string, unknown>): fields is Omit<User, 'id'> {
    const validUsername =
      'username' in fields && typeof fields.username === 'string' && !!fields.username;
    const validAge = 'age' in fields && typeof fields.age === 'number' && fields.age > 0;
    const validHobbies =
      'hobbies' in fields &&
      Array.isArray(fields.hobbies) &&
      fields.hobbies.every((value) => typeof value === 'string');

    return validUsername && validAge && validHobbies;
  }
}
