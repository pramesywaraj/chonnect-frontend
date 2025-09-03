import api from './axios';

import type { FetchRoomsParam, ICreateRoomRequest, ICreateRoomResponse, Room } from '@/types/room';
import type { IErrorResponse, ISuccessResponse, CursorPagination } from '@/types/api-response';
import API_ROUTES from '@/constants/api-routes';

export const fetchRooms = async (params: FetchRoomsParam): Promise<CursorPagination<Room>> => {
  try {
    const response = await api.get<ISuccessResponse<CursorPagination<Room>>>(API_ROUTES.ROOM.FETCH_ROOMS, { params });
    return response.data.data;
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message && err.status_code && err.path && err.timestamp) throw err;

    throw {
      message: `Error occured when hit ${API_ROUTES.ROOM.FETCH_ROOMS}`,
      path: API_ROUTES.ROOM.FETCH_ROOMS
    } as IErrorResponse;
  }
};

export const fetchRoomDetail = async (roomId: string) => {
  try {
    const response = await api.get<ISuccessResponse<Room>>(API_ROUTES.ROOM.FETCH_ROOM_DETAIL(roomId));
    return response.data.data;
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message && err.status_code && err.path && err.timestamp) throw err;

    throw {
      message: `Error occured when hit ${API_ROUTES.ROOM.FETCH_ROOM_DETAIL(roomId)}`,
      path: API_ROUTES.ROOM.FETCH_ROOM_DETAIL(roomId)
    } as IErrorResponse;
  }
};

export const createRoom = async (request: ICreateRoomRequest) => {
  try {
    const response = await api.post<ISuccessResponse<ICreateRoomResponse>>(API_ROUTES.ROOM.CREATE_ROOM, request);
    return response.data.data;
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message && err.status_code && err.path && err.timestamp) throw err;

    throw {
      message: `Error occured when hit ${API_ROUTES.ROOM.CREATE_ROOM}`,
      path: API_ROUTES.ROOM.CREATE_ROOM
    } as IErrorResponse;
  }
};
