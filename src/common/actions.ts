import { IncomingMessage } from 'http';
import userStorage from '../database/users';
import { responses } from './responses';
import { validateUserInfo } from './utils';
import { validate } from 'uuid';
import { UserData } from './types';

export const useReadUsers = () => responses.get(userStorage.getUsers());

export const useReadUserById = (id: string) => {
  if (!validate(id)) return responses.getUser.INVALID_ID(id);

  const user = userStorage.getUserById(id);
  if (user) return responses.getUser.SUCCESS(user);

  return responses.getUser.NOT_EXIST(id);
};

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
            : responses.postUser.REQUIRED_FIELDS_MISSING,
        );
      } catch {
        resolve(responses.postUser.BAD_REQUEST_PARAMS);
      }
    });
  });
};

export const useUpdateUser = (id: string, request: IncomingMessage) => {
  if (!validate(id))
    return new Promise((res) => res(responses.putUser.INVALID_ID));

  return new Promise((resolve) => {
    let body = '';

    request.on('data', (chunk) => (body += chunk));

    request.on('end', () => {
      try {
        const userInfo = JSON.parse(body) as Required<UserData>;

        if (validateUserInfo(userInfo)) {
          userStorage.getUserById(id)
            ? resolve(
                responses.putUser.SUCCESS(
                  userStorage.updateUser({ ...userInfo, id: id })!,
                ),
              )
            : resolve(responses.putUser.NOT_EXIST(id));
        } else {
          resolve(responses.putUser.REQUIRED_FIELDS_MISSING);
        }
      } catch {
        resolve(responses.putUser.BAD_REQUEST_PARAMS);
      }
    });
  });
};

export const useDeleteUser = (id: string) => {
  if (!validate(id)) return responses.deleteUser.INVALID_ID(id);

  if (userStorage.getUserById(id)) {
    userStorage.deleteUser(id);
    return responses.deleteUser.SUCCESS(id);
  }

  return responses.deleteUser.NOT_EXIST(id);
};
