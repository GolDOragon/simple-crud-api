import { UserFields } from '../models/UserModel';

export const isUsersEqual = (
  expect: jest.Expect,
  response: UserFields | undefined,
  expected: UserFields,
) => {
  expect(response?.username).toBe(expected.username);
  expect(response?.age).toBe(expected.age);
  expect(response?.hobbies).toEqual(expected.hobbies);
};
