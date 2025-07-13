import axios, { AxiosHeaders, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { env } from '@/constants/env';

const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (!config.headers) config.headers = new AxiosHeaders();

    if (token) {
      if (typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    return Promise.reject(error);
  }
);

export default api;
