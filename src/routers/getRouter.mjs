import { validate } from 'uuid';

function isPersonRoute(url) {
  return (url.startsWith('/person/') && validate(url.split('/person/')[1])) || url === '/person';
}

export function getRouter(url) {
  if (isPersonRoute(url)) {
    return 'person';
  }

  return '404';
}
