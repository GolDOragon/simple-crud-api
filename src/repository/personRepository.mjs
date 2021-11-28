import { Person } from '../models/Person.mjs';
import { Repository } from './Repository.mjs';

export const personRepository = new Repository(Person);
