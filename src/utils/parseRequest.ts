import { IncomingMessage, ServerResponse } from 'http';

import { EventMethods, EventRoutes } from '../typing/Event';
import { HEADERS, STATUS_CODE } from './constants';

const AVAILABLE_METHODS = Object.values(EventMethods);
const AVAILABLE_ROUTES = Object.values(EventRoutes);

export const getEvent = (req: IncomingMessage, res: ServerResponse): string | undefined => {
  const method = req.method?.toUpperCase();
  if (!AVAILABLE_METHODS.includes(method as EventMethods)) {
    res.writeHead(STATUS_CODE.NOT_FOUND, HEADERS.TEXT);
    res.end('Unknown method');
    return;
  }

  const route = req.url?.split('/')[1]?.toUpperCase();
  if (!AVAILABLE_ROUTES.includes(route as EventRoutes)) {
    res.writeHead(STATUS_CODE.NOT_FOUND, HEADERS.TEXT);
    res.end('Unknown route');
    return;
  }

  return `${route as EventRoutes}:${method as EventMethods}`;
};

export const getBody = (
  request: IncomingMessage,
  response: ServerResponse,
): Promise<Record<string, unknown> | string> => {
  return new Promise((resolve) => {
    let raw = '';

    request.on('data', (chunk: Buffer) => {
      raw += chunk.toString();
    });

    request.on('end', () => {
      try {
        resolve(
          request.headers['content-type'] === 'application/json'
            ? (JSON.parse(raw) as Record<string, unknown>)
            : raw,
        );
      } catch (err) {
        response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR, HEADERS.TEXT);
        response.end('Bad JSON');
      }
    });
  });
};
