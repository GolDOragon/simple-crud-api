import * as personService from '../services/personService.mjs';

const SUCCESS_CODE = 200;

export async function getAll(request, response) {
  try {
    const persons = await personService.getPersons();

    response.statusCode = SUCCESS_CODE;
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

    response.statusCode = SUCCESS_CODE;
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

    response.statusCode = SUCCESS_CODE;
    response.write(JSON.stringify(person));
  } catch (error) {
    response.statusCode = error.code;
    response.write(error.message);
  } finally {
    response.end();
  }
}

export async function deleteById(request, response) {}

export async function updateById(request, response) {}
