export function getBody(request, response, next) {
  const data = [];

  // assemble stream of data from request body
  request.on('data', (dataChunk) => {
    data.push(dataChunk);
  });

  request.on('end', () => {
    request.body = Buffer.concat(data).toString();
    if (request.headers['content-type'] === 'application/json') {
      request.body = JSON.parse(request.body);
    }

    // move on to next step in handling response
    next(request, response);
  });
}
