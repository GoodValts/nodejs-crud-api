import http from 'http';
import requestListener from './server/requestListener';

const PORT = process.env.PORT || 3001;

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(
    '\n\x1b[32m\x1b[1m%s: \x1b[35m\x1b[1m%s\x1b[0m\n\x1b[34m%s\n',
    'Server is running on port',
    `${PORT}`,
    `http://localhost:${PORT}`,
  );
});
