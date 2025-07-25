import api from './axios';

import type { IErrorResponse, ISuccessResponse } from '@/types/api-response';
import type { User } from '@/types/user';
import API_ROUTES from '@/constants/api-routes';

export const fetchProfile = async (): Promise<User> => {
  try {
    const response = await api.get<ISuccessResponse<User>>(API_ROUTES.USER.PROFILE);
    return response.data.data;
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message && err.status_code && err.path && err.timestamp) throw err;

    throw {
      message: `Error occured when hit ${API_ROUTES.USER.PROFILE}`,
      path: API_ROUTES.USER.PROFILE
    } as IErrorResponse;
  }
};

export const fetchOtherProfile = async (userId: string): Promise<User> => {
  try {
    const response = await api.get<ISuccessResponse<User>>(API_ROUTES.USER.OTHER(userId));
    return response.data.data;
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message && err.status_code && err.path && err.timestamp) throw err;

    throw {
      message: `Error occured when hit ${API_ROUTES.USER.OTHER(userId)}`,
      path: API_ROUTES.USER.OTHER(userId)
    } as IErrorResponse;
  }
};
