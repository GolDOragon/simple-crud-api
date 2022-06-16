import { createServer } from 'http';

import { AppError } from './AppError';
import { emitter } from './Router/Emitter';
import { getBody, getEvent } from './utils/parseRequest';

export const server = createServer(async (req, res) => {
  try {
    const event = getEvent(req);
    const body = await getBody(req, res);

    emitter.emit(`${event.route}:${event.method}`, req, res, body);
  } catch (err) {
    if (err instanceof AppError) {
      res.statusCode = err.code;
      res.write(err.message);
    }
    console.error(err);
  } finally {
    res.end("\nI think it's time to say goodbye\nGoodbye, goodbye\nGoodbye, goodbye, woah");
  }
});
