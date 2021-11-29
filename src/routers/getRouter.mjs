function isPersonRoute(url) {
  return url.startsWith('/person/') || url === '/person';
}

export function getRouter(url) {
  if (isPersonRoute(url)) {
    return 'person';
  }

  return '404';
}
