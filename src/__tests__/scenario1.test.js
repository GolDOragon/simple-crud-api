import request from 'supertest';
import { server } from '../server.js';
import { validate as uuidValidate } from 'uuid';

describe('Hacker scope scenario', () => {
  const testPerson = {
    name: 'Bad Guy',
    age: 24,
    hobbies: ['destroy everything'],
  };
  let testPersonId;

  test('GET-запросом получаем все объекты (ожидается пустой массив)', async () => {
    const response = await request(server).get('/person');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)', async () => {
    const response = await request(server).post('/person').send(testPerson);

    expect(response.status).toBe(201);

    const { body } = response;
    testPersonId = body.id;

    expect(uuidValidate(body.id)).toBeTruthy();
    expect(body.name).toEqual(testPerson.name);
    expect(body.age).toBe(testPerson.age);
    expect(body.hobbies).toEqual(testPerson.hobbies);
  });

  test('GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект)', async () => {
    const response = await request(server).get(`/person/${testPersonId}`);

    expect(response.status).toBe(200);

    const { body } = response;

    expect(body.id).toBe(testPersonId);
    expect(body.name).toEqual(testPerson.name);
    expect(body.age).toBe(testPerson.age);
    expect(body.hobbies).toEqual(testPerson.hobbies);
  });

  test('PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id)', async () => {
    const updating = {
      name: 'Friendly Person',
      age: 24,
      hobbies: ['help people'],
    };

    const response = await request(server).put(`/person/${testPersonId}`).send(updating);

    expect(response.status).toBe(200);

    const { body } = response;

    expect(body.id).toBe(testPersonId);
    expect(body.name).toEqual(updating.name);
    expect(body.age).toBe(updating.age);
    expect(body.hobbies).toEqual(updating.hobbies);
  });

  test('DELETE-запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления)', async () => {
    const response = await request(server).del(`/person/${testPersonId}`);

    expect(response.status).toBe(204);
  });

  test('GET-запросом пытаемся получить удаленный объект по id (ожидается ответ, что такого объекта нет)', async () => {
    const response = await request(server).get(`/person/${testPersonId}`);

    expect(response.status).toBe(404);
  });
});
