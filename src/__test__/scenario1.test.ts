import request from 'supertest';

import { User, UserFields } from '../models/UserModel';
import { server } from '../server';
import { STATUS_CODE } from '../utils/constants';
import { isValidId } from '../utils/UUID';
import { isUsersEqual } from './isUsersEqual';

describe('E2E Task example', () => {
  const testUser: UserFields = {
    username: 'Bad Guy',
    age: 24,
    hobbies: ['destroy everything'],
  };
  let testUserId: string;

  test('GET all records => should return empty array', async () => {
    const response = await request(server).get('/users').set('Accept', 'application/json');

    expect(response.status).toBe(STATUS_CODE.OK);
    expect(response.body).toEqual([]);
  });

  test('POST new user => should return newly created record', async () => {
    const response = await request(server).post('/users').send(testUser);

    expect(response.status).toBe(STATUS_CODE.CREATED);

    const responseUser = response.body as User | undefined;

    testUserId = responseUser?.id || '';

    expect(isValidId(responseUser?.id)).toBeTruthy();
    isUsersEqual(expect, responseUser, testUser);
  });

  test('GET created user => should return record', async () => {
    const response = await request(server).get(`/users/${testUserId}`);

    expect(response.status).toBe(STATUS_CODE.OK);

    const responseUser = response.body as User | undefined;

    expect(responseUser?.id).toBe(testUserId);
    isUsersEqual(expect, responseUser, testUser);
  });

  test('PUT created user => should return updated record', async () => {
    const updating: Partial<UserFields> = {
      username: 'Strange guy',
    };

    const response = await request(server).put(`/users/${testUserId}`).send(updating);

    expect(response.status).toBe(200);

    const responseUser = response.body as User | undefined;

    expect(responseUser?.id).toBe(testUserId);
    isUsersEqual(expect, responseUser, { ...testUser, ...updating });
  });

  test('DELETE created user => should return right status code', async () => {
    const response = await request(server).del(`/users/${testUserId}`);

    expect(response.status).toBe(204);
  });

  test('GET deleted user => should return right status code', async () => {
    const response = await request(server).get(`/users/${testUserId}`);

    expect(response.status).toBe(404);
  });
});
