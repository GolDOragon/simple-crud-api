import { IncomingMessage, ServerResponse } from 'http';

import { AppResponse } from './Response';

export interface IController {
  (
    request: IncomingMessage,
    response: ServerResponse,
    parsedBody: Record<string, unknown>,
  ): Promise<AppResponse>;
}

export interface IHandler {
  (
    request: IncomingMessage,
    response: ServerResponse,
    parsedBody: Record<string, unknown>,
  ): Promise<void>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IClass<T = any> {
  new (...args: any[]): T;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
