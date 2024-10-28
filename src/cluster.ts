import http, { IncomingMessage, ServerResponse } from 'http';
import cluster from 'cluster';

import { availableParallelism } from 'os';
import requestListener, { CONTENT_TYPE } from './server/requestListener';
import { responses } from './common/responses';

const PRIMARY_PORT = Number(process.env.PORT) || 4001;
const cpus = availableParallelism();

let port = PRIMARY_PORT;

const getPort = () => {
  if ((port += 1) >= PRIMARY_PORT + cpus) port = PRIMARY_PORT + 1;
  return port;
};

const primaryListener = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const options = {
    hostname: 'localhost',
    port: getPort(),
    path: request.url,
    method: request.method,
    headers: request.headers,
  };

  const listener = http.request(options, (proxyResponse) => {
    response.writeHead(proxyResponse.statusCode!, proxyResponse.headers);
    proxyResponse.pipe(response, { end: true });
  });

  listener.on('error', () => {
    const serverError = responses.serverErrors.SERVER_UNAVAILABLE;

    response.writeHead(serverError.statusCode, CONTENT_TYPE);
    response.end(serverError.message);
  });

  request.pipe(listener, { end: true });
};

if (cluster.isPrimary) {
  const primaryServer = http.createServer(primaryListener);

  primaryServer.listen(PRIMARY_PORT, () =>
    console.log(
      '\n\x1b[32m\x1b[1m%s: \x1b[35m\x1b[1m%s\x1b[0m\n\x1b[34m%s\x1b\x1b[0m',
      'Primary server is running on port',
      `${PRIMARY_PORT}`,
      `http://localhost:${PRIMARY_PORT}`,
    ),
  );

  for (let i = 1; i < cpus; i++) {
    cluster.fork({ WORKER_PORT: PRIMARY_PORT + i });
  }
}

if (cluster.isWorker) {
  const WORKER_PORT = process.env.WORKER_PORT;
  const server = http.createServer(requestListener);

  server.listen(WORKER_PORT, () => {
    console.log(
      '\n\x1b[34m\x1b[1m%s: \x1b[35m%s\x1b[0m \x1b[36m%s\x1b\x1b[0m',
      `Worker_${parseInt(WORKER_PORT as string) - PRIMARY_PORT} port`,
      `${WORKER_PORT}`,
      `http://localhost:${WORKER_PORT}`,
    );
  });

  server.on('request', () =>
    console.log(`\x1b[33mProcessed on ${WORKER_PORT} port\x1b[0m`),
  );
}
