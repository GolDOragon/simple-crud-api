import * as personController from '../controllers/personController.mjs';

const isExactPerson = (url) => /^\/person\/?$/.test(url);

export function personRouter(request, response) {
  switch (request.method) {
    case 'GET':
      if (isExactPerson(request.url)) {
        personController.getAll(request, response);
      }

      personController.getById(request, response);
      break;
    case 'POST':
      personController.create(request, response);
      break;
    case 'DELETE':
      personController.deleteById(request, response);
      break;
    case 'UPDATE':
      personController.updateById(request, response);
      break;

    default:
  }
}
