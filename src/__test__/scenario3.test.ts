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

  let userId: string;

  test('POST new user => should return created record', async () => {
    const response = await request(server).post('/users').send(testUser);

    const responseUser = response.body as User | undefined;
    userId = responseUser?.id || '';

    expect(response.status).toBe(STATUS_CODE.CREATED);
    isUsersEqual(expect, responseUser, testUser);
  });

  test('DELETE created user => should return right status code', async () => {
    const response = await request(server).del(`/users/${userId}`);

    expect(response.status).toBe(204);
  });

  test('DELETE created user second time => should return human friendly message', async () => {
    const response = await request(server).del(`/users/${userId}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`Entity doesn't exist.`);
  });
});
