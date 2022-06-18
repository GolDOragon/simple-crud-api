import EventEmitter from 'events';

import * as User from '../controllers/UserController';

export const emitter = new EventEmitter();

emitter.on(...User.get);
emitter.on(...User.post);
emitter.on(...User.put);
emitter.on(...User.deleteMethod);
