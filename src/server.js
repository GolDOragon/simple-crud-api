import { createServer } from 'node:http';
import { getRouter } from './routers/getRouter.mjs';
import { personRouter } from './routers/personRouter.mjs';
import { unknownRouter } from './routers/unknownRouter.mjs';
import { getBody } from './helpers/getBody.mjs';

export const server = createServer((request, response) => {
  const route = getRouter(request.url);

  switch (route) {
    case 'person':
      getBody(request, response, personRouter);
      break;

    default:
      unknownRouter(request, response);
  }
});
