import { IncomingMessage, ServerResponse } from 'http';

import { AppResponse } from './Response';

export interface IController {
  (req: IncomingMessage, res: ServerResponse, parsedBody: unknown): Promise<AppResponse>;
}

export interface IHandler {
  (req: IncomingMessage, res: ServerResponse, parsedBody: unknown): Promise<void>;
}
