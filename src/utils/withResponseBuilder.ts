import { IncomingMessage, ServerResponse } from 'http';

import { AppError } from '../AppError';
import { IController, IHandler } from '../typing/Interfaces';
import { HEADERS, STATUS_CODE } from './constants';

export const withResponseBuilder = (getResult: IController): IHandler => {
  return async function (req: IncomingMessage, res: ServerResponse, parsedBody: unknown) {
    try {
      const { statusCode, responseBody } = await getResult(req, res, parsedBody);

      res.writeHead(statusCode, HEADERS.JSON);
      res.end(JSON.stringify(responseBody));
    } catch (error) {
      res.statusCode = error instanceof AppError ? error.code : STATUS_CODE.INTERNAL_SERVER_ERROR;
      res.end(error instanceof Error ? error.message : error);
    }
  };
};
