import { IncomingMessage } from 'http';
import userStorage from '../database/users';
import { responses } from './responses';
import { validateUserInfo } from './utils';

export const useGetUsers = () => responses.get(userStorage.getUsers());

export const useCreateUser = (request: IncomingMessage) => {
  return new Promise((resolve) => {
    let body = '';

    request.on('data', (chunk) => (body += chunk));

    request.on('end', () => {
      try {
        const userInfo = JSON.parse(body);

        resolve(
          validateUserInfo(userInfo)
            ? responses.postUser.SUCCESS(userStorage.addUser(userInfo))
            : responses.postUser.BAD_REQUEST_PARAMS,
        );
      } catch {
        resolve(responses.postUser.BAD_REQUEST_PARAMS);
      }
    });
  });
};
