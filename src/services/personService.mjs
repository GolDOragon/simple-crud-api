import { validate as uuidValidation } from 'uuid';
import { SERVICE_ERROR_CODES, ServiceError } from '../helpers/ServiceError.mjs';
import { personRepository } from '../repository/personRepository.mjs';
import { Person } from '../models/Person.mjs';

export async function getPersons() {
  try {
    const persons = await personRepository.getAll();
    return persons;
  } catch (error) {
    throw new ServiceError(error.message, error.code);
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
    throw new ServiceError(error.message, error.code);
  }
}

export async function createPerson(body) {
  if (!Person.isValidArgs(body)) {
    throw new ServiceError(
      'Required fields are missing or they are invalid',
      SERVICE_ERROR_CODES.REQUIRED_FIELD,
    );
  }

  try {
    const person = new Person(body);

    const createdPerson = await personRepository.create(person);
    return createdPerson;
  } catch (error) {
    throw new ServiceError(error.message, error.code);
  }
}

export async function updatePersonById(id, body) {
  if (!uuidValidation(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  if (!Person.isValidArgs(body)) {
    throw new ServiceError(
      'Required fields are missing or they are invalid',
      SERVICE_ERROR_CODES.REQUIRED_FIELD,
    );
  }

  try {
    const updatedPerson = await personRepository.updateOne(id, body);
    return updatedPerson;
  } catch (error) {
    throw new ServiceError(error.message, error.code);
  }
}

export async function deletePersonById(id) {
  if (!uuidValidation(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  try {
    const deletedPerson = await personRepository.deleteOne(id);

    return deletedPerson;
  } catch (error) {
    throw new ServiceError(error.message, error.code);
  }
}
