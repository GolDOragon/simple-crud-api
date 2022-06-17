import EventEmitter from 'events';

import * as User from '../controllers/User';

export const emitter = new EventEmitter();

emitter.on(...User.getAll);
