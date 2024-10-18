import { ErrorResponse, Responses, UserData } from './types';

const createDataResponse = (statusCode: number) => {
  return (data: UserData | UserData[]) => {
    return {
      statusCode: statusCode,
      message: JSON.stringify(data),
    };
  };
};

const createMessageResponse = (
  statusCode: number,
  message: string,
): ErrorResponse => {
  return (id: string) => {
    const strArr = message.split('id');
    if (id.length) strArr[1] = `id=${id}`.concat(strArr[1]);

    return {
      statusCode: statusCode,
      message: strArr.join(''),
    };
  };
};

export const responses: Responses = {
  get: createDataResponse(200),
  getUser: {
    SUCCESS: createDataResponse(200),
    INVALID_ID: createMessageResponse(400, 'User id is not valid'),
    NOT_EXIST: createMessageResponse(404, "User with id doesn't exist"),
  },
  postUser: {
    SUCCESS: createDataResponse(201),
    BAD_REQUEST_PARAMS: createMessageResponse(
      400,
      'Request body does not contain required fields',
    )(''),
  },
  putUser: {
    SUCCESS: createDataResponse(200),
    INVALID_ID: createMessageResponse(400, 'User id is not valid'),
    NOT_EXIST: createMessageResponse(404, "User with id doesn't exist"),
  },
  deleteUser: {
    SUCCESS: createMessageResponse(204, 'User with id was deleted'),
    INVALID_ID: createMessageResponse(400, 'User id is not valid'),
    NOT_EXIST: createMessageResponse(404, "User with id doesn't exist"),
  },
  serverErrors: {
    BROKEN_ROUTE: createMessageResponse(404, 'Endpoint is not exist')(''),
    SERVER_UNAVAILABLE: createMessageResponse(500, 'Internal Server Error')(''),
  },
};
