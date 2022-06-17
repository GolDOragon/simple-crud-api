import { createServer } from 'http';

import { emitter } from './Router/Emitter';
import { getBody, getEvent } from './utils/parseRequest';

export const server = createServer(async (req, res) => {
  const event = getEvent(req, res);
  if (!event) return;

  const body = await getBody(req, res);

  emitter.emit(event, req, res, body);
});
