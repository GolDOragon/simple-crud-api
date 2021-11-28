import * as personService from '../services/personService.mjs';

const SUCCESS = 200;
const SUCCESS_CREATE = 201;
const SUCCESS_DELETE = 204;
const SERVER_ERROR = 500;

// TODO: write response builder

export async function getAll(request, response) {
  try {
    const persons = await personService.getPersons();

    response.writeHead(SUCCESS, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(persons));
  } catch (error) {
    response.statusCode = error.code || SERVER_ERROR;
    response.write(error.message);
  } finally {
    response.end();
  }
}

export async function getById(request, response) {
  const id = request.url.replace('/person/', '');

  try {
    const person = await personService.getPersonById(id);

    response.writeHead(SUCCESS, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(person));
  } catch (error) {
    response.statusCode = error.code || SERVER_ERROR;
    response.write(error.message);
  } finally {
    response.end();
  }
}

export async function create(request, response) {
  try {
    const person = await personService.createPerson(request.body);

    response.writeHead(SUCCESS_CREATE, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(person));
  } catch (error) {
    response.statusCode = error.code || SERVER_ERROR;
    response.write(error.message);
  } finally {
    response.end();
  }
}

export async function updateById(request, response) {
  const id = request.url.replace('/person/', '');

  try {
    const updatedPerson = await personService.updatePersonById(id, request.body);

    response.writeHead(SUCCESS, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(updatedPerson));
  } catch (error) {
    response.statusCode = error.code || SERVER_ERROR;
    response.write(error.message);
  } finally {
    response.end();
  }
}

export async function deleteById(request, response) {
  const id = request.url.replace('/person/', '');

  try {
    const deletedPerson = await personService.deletePersonById(id);

    response.writeHead(SUCCESS_DELETE, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(deletedPerson));
  } catch (error) {
    response.statusCode = error.code || SERVER_ERROR;
    response.write(error.message);
  } finally {
    response.end();
  }
}
