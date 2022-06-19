import { IncomingMessage, ServerResponse } from 'http';

import { EventMethods, EventRoutes } from '../types/Event';
import { HEADERS, STATUS_CODE } from './constants';

const AVAILABLE_ROUTES = Object.values(EventRoutes);
const isAvailableRoute = (route?: string): route is EventRoutes => {
  return AVAILABLE_ROUTES.includes(route as EventRoutes);
};

const AVAILABLE_METHODS = Object.values(EventMethods);
const isAvailableMethod = (method?: string): method is EventMethods => {
  return AVAILABLE_METHODS.includes(method as EventMethods);
};

const endConnection = (message: string, res: ServerResponse) => {
  res.writeHead(STATUS_CODE.NOT_FOUND, HEADERS.TEXT);
  res.end(message);
  return undefined;
};

export const getEvent = (req: IncomingMessage, res: ServerResponse): string | undefined => {
  const route = req.url?.split('/')[1]?.toUpperCase();

  if (!isAvailableRoute(route)) {
    return endConnection('unknownRoute', res);
  }

  const method = req.method?.toUpperCase();

  if (!isAvailableMethod(method)) {
    return endConnection('unknownMethod', res);
  }

  return `${route}:${method}`;
};
