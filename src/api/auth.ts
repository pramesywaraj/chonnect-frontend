import api from './axios';
import type { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '@/types/auth';
import type { ISuccessResponse } from '@/types/api-response';
import API_ROUTES from '@/constants/api-routes';

export const login = async (request: ILoginRequest) => {
  const response = await api.post<ISuccessResponse<ILoginResponse>>(API_ROUTES.AUTH.LOGIN, request);
  return response.data;
};

export const register = async (request: IRegisterRequest) => {
  const response = await api.post<IRegisterResponse>(API_ROUTES.AUTH.REGISTER, request);
  return response.data;
};
