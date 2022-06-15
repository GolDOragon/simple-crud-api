import 'dotenv/config';

import { generateUUID } from './utils/uuid';

console.log(`Hello! Try to listen ${process.env.PORT || ''}!`);

console.log(generateUUID());
