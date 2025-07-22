import api from './axios';

import type { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '@/types/auth';
import type { IErrorResponse, ISuccessResponse } from '@/types/api-response';
import API_ROUTES from '@/constants/api-routes';

export const login = async (request: ILoginRequest): Promise<ILoginResponse> => {
  try {
    const response = await api.post<ISuccessResponse<ILoginResponse>>(API_ROUTES.AUTH.LOGIN, request);
    return response.data.data;
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message && err.status_code && err.path && err.timestamp) throw err;

    throw { message: `Error occured when hit ${API_ROUTES.AUTH.LOGIN}`, path: API_ROUTES.AUTH.LOGIN } as IErrorResponse;
  }
};

export const register = async (request: IRegisterRequest): Promise<IRegisterResponse> => {
  try {
    const response = await api.post<ISuccessResponse<IRegisterResponse>>(API_ROUTES.AUTH.REGISTER, request);
    return response.data.data;
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message && err.status_code && err.path && err.timestamp) throw err;

    throw {
      message: `Error occured when hit ${API_ROUTES.AUTH.REGISTER}`,
      path: API_ROUTES.AUTH.REGISTER
    } as IErrorResponse;
  }
};

export const refreshToken = async (refresh_token: string): Promise<ILoginResponse> => {
  try {
    const response = await api.post<ISuccessResponse<ILoginResponse>>(API_ROUTES.AUTH.REFRESH_TOKEN, undefined, {
      headers: { Authorization: `Bearer ${refresh_token}` },
      skipAuth: true
    });
    return response.data.data;
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message && err.status_code && err.path && err.timestamp) throw err;

    throw {
      message: `Error occured when hit ${API_ROUTES.AUTH.REFRESH_TOKEN}`,
      path: API_ROUTES.AUTH.REFRESH_TOKEN
    } as IErrorResponse;
  }
};
