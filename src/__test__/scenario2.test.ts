import request from 'supertest';

import { User, UserFields } from '../models/UserModel';
import { server } from '../server';
import { STATUS_CODE } from '../utils/constants';
import { isUsersEqual } from './isUsersEqual';

describe('E2E Custom scenario', () => {
  const testUser: UserFields = {
    username: 'Just Human',
    age: 42,
    hobbies: ['job', 'bear'],
  };
  const updatedEntity: Partial<UserFields> = {
    username: 'Super Human',
    hobbies: ['programming', 'sport'],
  };

  let lastUserId: string;

  test('POST 3 users => should return created records', async () => {
    const requests = [];
    for (let i = 0; i < 3; i++) {
      requests.push(request(server).post('/users').send(testUser));
    }

    const users = await Promise.all(requests).then((responses) =>
      responses.map(({ body }) => body as User | undefined),
    );

    lastUserId = users[2]?.id || '';

    isUsersEqual(expect, users[0], testUser);
    isUsersEqual(expect, users[1], testUser);
    isUsersEqual(expect, users[2], testUser);
  });

  test('PUT one of them => should return updated record', async () => {
    const response = await request(server).put(`/users/${lastUserId}`).send(updatedEntity);

    const responseUser = response.body as User | undefined;

    expect(response.statusCode).toBe(STATUS_CODE.OK);
    expect(responseUser?.id).toBe(lastUserId);
    isUsersEqual(expect, responseUser, { ...testUser, ...updatedEntity });
  });

  test('GET all entities => should return all records', async () => {
    const response = await request(server).get('/users');

    const users = response.body as User[];

    expect(response.status).toBe(200);
    expect(users.length).toBe(3);

    isUsersEqual(expect, users[0], testUser);
    isUsersEqual(expect, users[1], testUser);
    isUsersEqual(expect, users[2], { ...testUser, ...updatedEntity });
  });
});
