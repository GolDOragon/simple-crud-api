import request from 'supertest';
import { server } from '../server.js';

describe('Custom scenario', () => {
  const testPerson = {
    name: 'Just Human',
    age: 42,
    hobbies: ['job', 'bear'],
  };

  let id;

  test('Create new entity => expect response with new entity', async () => {
    const response = await request(server).post('/person').send(testPerson);

    expect(response.status).toBe(201);

    id = response.body.id;

    const { body } = response;

    expect(body.id).toBe(id);
    expect(body).toMatchObject(testPerson);
  });

  test('Delete created entity by id => success code expected', async () => {
    const response = await request(server).del(`/person/${id}`);

    expect(response.status).toBe(204);
  });

  test('AGAIN delete created entity by id => human friendly message expected', async () => {
    const response = await request(server).del(`/person/${id}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`Person doesn't exist`);
  });
});
