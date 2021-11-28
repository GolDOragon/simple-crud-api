import * as personController from '../controllers/personController.mjs';
import { unknownRouter } from './unknownRouter.mjs';

const isExactPerson = (url) => /^\/person\/?$/.test(url);

export function personRouter(request, response) {
  switch (request.method) {
    case 'GET':
      if (isExactPerson(request.url)) {
        personController.getAll(request, response);
      } else {
        personController.getById(request, response);
      }
      break;
    case 'POST':
      personController.create(request, response);
      break;
    case 'DELETE':
      personController.deleteById(request, response);
      break;
    case 'PUT':
      personController.updateById(request, response);
      break;

    default:
      unknownRouter(request, response);
  }
}
