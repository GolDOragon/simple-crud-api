import { STATUS_CODE } from '../utils/constants';

export type AppResponse = {
  statusCode: STATUS_CODE;
  responseBody: unknown;
};
