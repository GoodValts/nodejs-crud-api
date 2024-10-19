export interface UserData {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface Message {
  statusCode: number;
  message: string;
}

export interface DataResponse {
  (data: UserData | UserData[]): Message;
}

export interface MessageResponse {
  (id: string): Message;
}

export type Responses = {
  get: DataResponse;
  getUser: {
    SUCCESS: DataResponse;
    INVALID_ID: MessageResponse;
    NOT_EXIST: MessageResponse;
  };
  postUser: {
    SUCCESS: DataResponse;
    BAD_REQUEST_PARAMS: Message;
    REQUIRED_FIELDS_MISSING: Message;
  };
  putUser: {
    SUCCESS: DataResponse;
    INVALID_ID: MessageResponse;
    NOT_EXIST: MessageResponse;
    BAD_REQUEST_PARAMS: Message;
    REQUIRED_FIELDS_MISSING: Message;
  };
  deleteUser: {
    SUCCESS: MessageResponse;
    INVALID_ID: MessageResponse;
    NOT_EXIST: MessageResponse;
  };
  serverErrors: {
    BROKEN_ROUTE: Message;
    SERVER_UNAVAILABLE: Message;
  };
};
