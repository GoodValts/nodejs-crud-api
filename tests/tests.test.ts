import { createServer, get, Server } from 'http';
import RequestListener from '../src/server/requestListener';
import userStorage from '../src/database/users';
import { UserData } from '../src/common/types';

let httpServer: Server | undefined;

const userInfo = { username: 'Jesus', age: 30, hobbies: ['traveling'] };

const server = () =>
  new Promise(
    (resolve) =>
      (httpServer = createServer(RequestListener).listen(3001, () =>
        resolve(''),
      )),
  );

const request = (url: string) =>
  new Promise((resolve) =>
    get(url, (res) => {
      let body = '';

      res.on('data', (chunk: string) => (body += chunk.toString()));
      res.on('end', () => resolve(body));
    }),
  );

beforeAll(async () => {
  await server();
});

afterAll(() => {
  if (httpServer) {
    httpServer.close();
  }
});

describe('Actions', () => {
  test('should record data', async () => {
    const initialResponse = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    );

    userStorage.addUser(userInfo);

    const response = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    );

    expect(response.length).toBe(initialResponse.length + 1);
  });

  test('should delete data', async () => {
    userStorage.addUser(userInfo);

    const initialResponse = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    ) as Required<UserData>[];

    userStorage.deleteUser(initialResponse[0].id);

    const response = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    );

    expect(response.length).toBe(initialResponse.length - 1);
  });

  test('should update data', async () => {
    userStorage.addUser(userInfo);

    const initialResponse = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    ) as Required<UserData>[];

    userStorage.updateUser({ ...initialResponse[0], hobbies: ['laziness'] });

    const response = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    );

    expect(response[0].hobbies).toStrictEqual(['laziness']);
  });
});
