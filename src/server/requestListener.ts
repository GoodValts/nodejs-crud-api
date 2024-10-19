import { IncomingMessage, ServerResponse } from 'http';
import { responses } from '../common/responses';
import { Message } from '../common/types';
import {
  useCreateUser,
  useDeleteUser,
  useReadUserById,
  useReadUsers,
  useUpdateUser,
} from '../common/actions';

const API_PATH = '/api/users';
const CONTENT_TYPE = { 'Content-Type': 'application/json' };

const requestListener = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const url = request.url;
  const method = request.method;

  let responseData: Message = responses.serverErrors.BROKEN_ROUTE;

  if (url?.startsWith(API_PATH)) {
    const endPoint = url.replace(API_PATH, '');
    const userID = /^\/[\w-]*$/.test(endPoint) ? endPoint.slice(1) : '';

    if (userID) {
      switch (method) {
        case 'GET':
          responseData = useReadUserById(userID);
          break;
        case 'PUT':
          responseData = (await useUpdateUser(
            userID,
            request,
          )) as typeof responseData;
          break;
        case 'DELETE':
          responseData = await useDeleteUser(userID);
          break;
        default:
          break;
      }
    } else if (endPoint === '' || endPoint === '/') {
      switch (method) {
        case 'GET':
          responseData = useReadUsers();
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
