import { IncomingMessage, ServerResponse } from 'http';

import { ERROR_MESSAGES, HEADERS, STATUS_CODE } from './constants';

export const getBody = (
  request: IncomingMessage,
  response: ServerResponse,
): Promise<Record<string, unknown>> => {
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
            : {},
        );
      } catch {
        response.writeHead(STATUS_CODE.BAD_REQUEST, HEADERS.TEXT);
        response.end(ERROR_MESSAGES.BAD_JSON);
      }
    });
  });
};
