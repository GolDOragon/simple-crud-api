import { v4 as uuid, validate } from 'uuid';

export const generateId = (): string => uuid();

export const getId = (url?: string): string | undefined => url?.replace(/^\/\w+\/?/, '');

export const isValidId = (id?: string): boolean => {
  if (!id) {
    return false;
  }

  return validate(id);
};
