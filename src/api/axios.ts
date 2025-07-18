import axios, { AxiosHeaders, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';

import { env } from '@/constants/env';
import { useUserStore } from '@/stores/user';

const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    const accessToken = userStore.accessToken;

    if (!config.headers) config.headers = new AxiosHeaders();

    if (accessToken) {
      if (typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      } else {
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  }
);

export default api;
