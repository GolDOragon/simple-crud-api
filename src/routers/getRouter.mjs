export function getRouter(url) {
  if (/^\/person\/?/.test(url)) {
    return 'person';
  }

  return '404';
}
