import dotenv from 'dotenv';
import { server } from './server.js';

dotenv.config();

server.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }

  console.log(`Listening on port ${process.env.PORT}`); // eslint-disable-line no-console
});
