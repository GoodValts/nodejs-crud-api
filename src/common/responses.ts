interface UserData {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

interface SuccessMessage {
  statusCode: number;
  data: string;
}

interface ErrorMessage {
  statusCode: number;
  message: string;
}

interface SuccessResponse {
  (data: UserData): SuccessMessage;
}

interface ErrorResponse {
  (id: string): ErrorMessage;
}

const createDataResponse = (statusCode: number) => {
  return (data: UserData) => {
    return {
      statusCode: statusCode,
      data: JSON.stringify(data),
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

type Responses = {
  get: SuccessResponse;
  getUser: {
    SUCCESS: SuccessResponse;
    INVALID_ID: ErrorResponse;
    NOT_EXIST: ErrorResponse;
  };
  postUser: {
    SUCCESS: SuccessResponse;
    BAD_REQUEST_PARAMS: ErrorMessage;
  };
  putUser: {
    SUCCESS: SuccessResponse;
    INVALID_ID: ErrorResponse;
    NOT_EXIST: ErrorResponse;
  };
  deleteUser: {
    SUCCESS: ErrorResponse;
    INVALID_ID: ErrorResponse;
    NOT_EXIST: ErrorResponse;
  };
  serverErrors: {
    BROKEN_ROUTE: ErrorMessage;
    SERVER_UNAVAILABLE: ErrorMessage;
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
