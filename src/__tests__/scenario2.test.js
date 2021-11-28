import request from 'supertest';
import { server } from '../server.js';
import { validate as uuidValidate } from 'uuid';

describe('Custom scenario', () => {
  const testPerson = {
    name: 'Just Human',
    age: 42,
    hobbies: ['job', 'bear'],
  };
  const updatedEntity = {
    name: 'Super Human',
    age: 42,
    hobbies: ['programming', 'sport'],
  };

  let lastPersonId;

  test('Create 3 persons', async () => {
    const requests = [];
    for (let i = 0; i < 3; i++) {
      requests.push(request(server).post('/person').send(testPerson));
    }

    const persons = await Promise.all(requests);

    lastPersonId = persons[2].body.id;

    expect(persons[0].body).toMatchObject(testPerson);
    expect(persons[1].body).toMatchObject(testPerson);
    expect(persons[2].body).toMatchObject(testPerson);
  });

  test('Update one of them', async () => {
    const response = await request(server).put(`/person/${lastPersonId}`).send(updatedEntity);

    const { body } = response;

    expect(body.id).toBe(lastPersonId);
    expect(body).toMatchObject(updatedEntity);
  });

  test('Get All entities', async () => {
    const response = await request(server).get('/person');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);

    expect(response.body[0]).toMatchObject(testPerson);
    expect(response.body[1]).toMatchObject(testPerson);
    expect(response.body[2]).toMatchObject(updatedEntity);
  });
});
