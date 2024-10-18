import { IncomingMessage, ServerResponse } from 'http';
import { responses } from '../common/responses';
import { ErrorMessage, SuccessMessage } from '../common/types';
import { useCreateUser, useGetUsers } from '../common/actionHooks';

const API_PATH = '/api/users';
const CONTENT_TYPE = { 'Content-Type': 'application/json' };

const requestListener = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const url = request.url;
  const method = request.method;

  let responseData: ErrorMessage | SuccessMessage =
    responses.serverErrors.BROKEN_ROUTE;

  if (url?.startsWith(API_PATH)) {
    const endPoint = url.replace(API_PATH, '');
    const userID = /^\/[\w-]*$/.test(endPoint) ? endPoint.slice(1) : '';

    if (userID) {
      switch (method) {
        case 'GET':
          responseData = responses.getUser.NOT_EXIST(userID);
          break;
        case 'PUT':
          break;
        case 'DELETE':
          break;
        default:
          break;
      }
    } else if (endPoint === '' || endPoint === '/') {
      switch (method) {
        case 'GET':
          responseData = useGetUsers();
          break;
        case 'POST':
          responseData = (await useCreateUser(request)) as typeof responseData;
          break;
        default:
          break;
      }
    }
  }

  response.writeHead(responseData.statusCode, CONTENT_TYPE);
  response.end(responseData.message);
};

export default requestListener;
