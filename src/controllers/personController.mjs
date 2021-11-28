import * as personService from '../services/personService.mjs';

const SUCCESS = 200;
const SUCCESS_CREATE = 201;

export async function getAll(request, response) {
  try {
    const persons = await personService.getPersons();

    response.statusCode = SUCCESS;
    response.write(JSON.stringify(persons));
  } catch (error) {
    response.statusCode = error.code;
    response.write(error.message);
  } finally {
    response.end();
  }
}

export async function getById(request, response) {
  const id = request.url.replace('/person/', '');

  try {
    const person = await personService.getPersonById(id);

    response.statusCode = SUCCESS;
    response.write(JSON.stringify(person));
  } catch (error) {
    response.statusCode = error.code;
    response.write(error.message);
  } finally {
    response.end();
  }
}

export async function create(request, response) {
  try {
    const person = await personService.createPerson(request.body);

    response.statusCode = SUCCESS_CREATE;
    response.write(JSON.stringify(person));
  } catch (error) {
    response.statusCode = error.code;
    response.write(error.message);
  } finally {
    response.end();
  }
}

export async function deleteById(request, response) {}

export async function updateById(request, response) {
  const id = request.url.replace('/person/', '');

  try {
    const updatedPerson = await personService.updatePersonById(id, request.body);

    response.statusCode = SUCCESS;
    response.write(JSON.stringify(updatedPerson));
  } catch (error) {
    response.statusCode = error.code;
    response.write(error.message);
  } finally {
    response.end();
  }
}
