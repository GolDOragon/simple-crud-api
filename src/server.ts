import { createServer } from 'http';

import { emitter } from './Router/Emitter';
import { getBody } from './utils/getBody';
import { getEvent } from './utils/getEvent';

export const server = createServer(async (req, res) => {
  const event = getEvent(req, res);
  if (!event) return;

  const body = await getBody(req, res);

  emitter.emit(event, req, res, body);
});
