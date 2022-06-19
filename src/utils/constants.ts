export const HEADERS = {
  JSON: { 'Content-Type': 'application/JSON' },
  TEXT: { 'Content-Type': 'plain/text' },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum ERROR_MESSAGES {
  INVALID_ID = 'Invalid id.',
  ENTITY_NOT_EXIST = "Entity doesn't exist.",
  INVALID_FIELDS = 'Invalid fields.',
  SERVER_ERROR = 'Unknown error',
  UNKNOWN_ROUTE = 'Unknown route',
  UNKNOWN_METHOD = 'Unknown method',
}
