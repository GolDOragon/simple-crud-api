import cluster from 'cluster';
import 'dotenv/config';
import * as os from 'os';

import { server } from './server';

const PORT = process.env.PORT || 3000;

if (cluster.isPrimary) {
  const cpusCount = os.cpus().length;

  for (let i = 0; i < cpusCount - 1; i += 1) {
    cluster.fork();
  }

  console.log(`Master has started, PID: ${process.pid}`);
}
if (cluster.isWorker) {
  server.listen(PORT, () => {
    console.log(`Server has started on ${PORT} port! PID: ${process.pid}`);
  });
}
