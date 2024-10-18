export interface UserData {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface SuccessMessage {
  statusCode: number;
  message: string;
}

export interface ErrorMessage {
  statusCode: number;
  message: string;
}

export interface SuccessResponse {
  (data: UserData | UserData[]): SuccessMessage;
}

export interface ErrorResponse {
  (id: string): ErrorMessage;
}

export type Responses = {
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
