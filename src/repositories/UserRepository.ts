import { User } from '../models/UserModel';
import { Repository } from './Repository';

export const userRepository = new Repository(User);
