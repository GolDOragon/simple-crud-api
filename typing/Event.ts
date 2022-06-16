export enum EventMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum EventRoutes {
  USERS = 'USERS',
}

export type Event = {
  method: EventMethods;
  route: EventRoutes;
};
