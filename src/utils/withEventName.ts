import { IHandler } from '../typing/Interfaces';

export const withEventName = (event: string, handler: IHandler) => [event, handler] as const;
