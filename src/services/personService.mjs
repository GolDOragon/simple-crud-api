import { validate as uuidValidation } from 'uuid';
import { SERVICE_ERROR_CODES, ServiceError } from '../helpers/ServiceError.mjs';
import { personRepository } from '../repository/personRepository.mjs';
import { Person } from '../models/Person.mjs';

export async function getPersons() {
  try {
    const persons = await personRepository.getAll();
    return persons;
  } catch (error) {
    throw new ServiceError(error.message, SERVICE_ERROR_CODES.BAD_REQUEST);
  }
}

export async function getPersonById(id) {
  if (!uuidValidation(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  try {
    const person = await personRepository.getOne(id);
    return person;
  } catch (error) {
    throw new ServiceError(error.message, SERVICE_ERROR_CODES.BAD_REQUEST);
  }
}

export async function createPerson(body) {
  try {
    const person = new Person(body);

    const createdPerson = await personRepository.create(person);
    return createdPerson;
  } catch (error) {
    throw new ServiceError(error.message, SERVICE_ERROR_CODES.BAD_REQUEST);
  }
}

export async function deletePerson(id) {
  return personRepository.deleteOne(id);
}
