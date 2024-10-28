import requestListener from './server/requestListener';
import userStorage from './database/users';
import fs from 'fs';
import path from 'path';
import http from 'http';

const PORT = process.env.PORT || 3001;
const server = http.createServer(requestListener);

server.listen(PORT, () =>
  console.log(
    '\n\x1b[32m\x1b[1m%s: \x1b[35m\x1b[1m%s\x1b[0m\n\x1b[34m%s\x1b\n\x1b[0m',
    'Server is running on port',
    `${PORT}`,
    `http://localhost:${PORT}`,
  ),
);

process.on('SIGINT', () => {
  console.log('\x1b[31m\x1b[1m%s\x1b[0m\n', 'Shut down server...');

  server.close(async () => {
    try {
      const fileName = '/log.txt';

      const writeStream = fs.createWriteStream(path.join(__dirname, fileName), {
        flags: 'w',
      });

      writeStream.on('finish', () => {
        console.log(
          '\n\x1b[36m%s\x1b[37m',
          `${fileName.slice(1)} created successfully!`,
        );
        process.exit(0);
      });

      writeStream.on('error', (err) => {
        console.log(
          '\x1b[31m\n%s\x1b[0m',
          `Error occurred while writing log.txt: ${err.message}`,
        );
        console.log('\nLog:\n', JSON.stringify(userStorage.getUsers()));
        process.exit(1);
      });

      writeStream.write(JSON.stringify(userStorage.getUsers()), 'utf8');
      writeStream.end();
    } catch (err) {
      console.log('Log:\n', userStorage.getUsers(), '\n');
      process.exit(1);
    } finally {
      console.log(
        '\x1b[34m%s\x1b[33m%s\n\x1b[32m\x1b[1m%s\x1b[0m',
        `http://localhost:${PORT}`,
        ' is empty',
        'Server closed successfully!',
      );
    }
  });
});
