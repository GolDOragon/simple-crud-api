import { IncomingMessage, ServerResponse } from 'http';

import { Event, EventMethods, EventRoutes } from '../../typing/Event';
import { AppError } from '../AppError';

const AVAILABLE_METHODS = Object.values(EventMethods);
const AVAILABLE_ROUTES = Object.values(EventRoutes);

export const getEvent = (req: IncomingMessage): Event => {
  const method = req.method;
  const route = req.url?.split('/')[1];

  if (!AVAILABLE_METHODS.includes(method?.toUpperCase() as EventMethods)) {
    throw new AppError({ name: 'RouteError', code: 404, message: 'Unknown method' });
  }
  if (!AVAILABLE_ROUTES.includes(route?.toUpperCase() as EventRoutes)) {
    throw new AppError({ name: 'RouteError', code: 404, message: 'Unknown route' });
  }

  return {
    method,
    route,
  } as Event;
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
        response.statusCode = 400;
        response.end('Bad JSON');
      }
    });
  });
};
