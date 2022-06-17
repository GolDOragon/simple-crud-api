export const HEADERS = {
  JSON: { 'Content-Type': 'application/JSON' },
  TEXT: { 'Content-Type': 'plain/text' },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum STATUS_CODE {
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
