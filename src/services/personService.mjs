import { SERVICE_ERROR_CODES, ServiceError } from '../helpers/ServiceError.mjs';
import { personRepository } from '../repository/personRepository.mjs';

export async function getPersons() {
  return personRepository.getAll();
}

export async function getById(id) {
  try {
    const person = await personRepository.getOne(id);
    return person;
  } catch (error) {
    throw new ServiceError(error.message, SERVICE_ERROR_CODES.BAD_REQUEST);
  }
}

export async function createPerson(body) {
  try {
    const person = {};

    const createdPerson = await personRepository.create(person);

    return createdPerson;
  } catch (error) {
    throw new ServiceError(error.message, SERVICE_ERROR_CODES.BAD_REQUEST);
  }
}

export async function deletePerson(id) {
  return personRepository.deleteOne(id);
}
