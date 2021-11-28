export function unknownRouter(request, response) {
  response.statusCode = 404;
  response.write(`Unknown route "${request.url}"`);
  response.end();
}
