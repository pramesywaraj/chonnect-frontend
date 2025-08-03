import api from './axios';

import type { ISendMessageRequest, Message } from '@/types/message';
import type { IErrorResponse, ISuccessResponse, CursorPagination } from '@/types/api-response';
import API_ROUTES from '@/constants/api-routes';

export const fetchMessagesOnRoom = async (
  roomId: string,
  params: { limit?: number; before?: string }
): Promise<CursorPagination<Message>> => {
  try {
    const response = await api.get<ISuccessResponse<CursorPagination<Message>>>(
      API_ROUTES.MESSAGE.FETCH_MESSAGE_ON_ROOM(roomId),
      { params }
    );
    return response.data.data;
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message && err.status_code && err.path && err.timestamp) throw err;

    throw {
      message: `Error occured when hit ${API_ROUTES.MESSAGE.FETCH_MESSAGE_ON_ROOM(roomId)}`,
      path: API_ROUTES.MESSAGE.FETCH_MESSAGE_ON_ROOM(roomId)
    } as IErrorResponse;
  }
};

export const postMessage = async (request: ISendMessageRequest): Promise<Message> => {
  try {
    const response = await api.post<ISuccessResponse<Message>>(API_ROUTES.MESSAGE.SEND_MESSAGE, request);
    return response.data.data;
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message && err.status_code && err.path && err.timestamp) throw err;

    throw {
      message: `Error occured when hit ${API_ROUTES.MESSAGE.SEND_MESSAGE}`,
      path: API_ROUTES.MESSAGE.SEND_MESSAGE
    } as IErrorResponse;
  }
};
