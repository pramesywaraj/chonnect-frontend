import axios, { AxiosHeaders, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';

import { env } from '@/constants/env';
import { useUserStore } from '@/stores/user';
import { NotificationTypeEnum, useNotificationStore } from '@/stores/notification';
import router from '@/routes';
import { refreshToken } from './auth';

interface IFailedQueueItem {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

let isRefreshing = false;
let failedQueue: IFailedQueueItem[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);

    prom.resolve(token as string);

    failedQueue = [];
  });
};

const assignAuthToken = (config: InternalAxiosRequestConfig, token: string): InternalAxiosRequestConfig => {
  if (typeof config.headers.set === 'function') {
    config.headers.set('Authorization', `Bearer ${token}`);
  } else {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    const accessToken = userStore.accessToken;

    if (!config.headers) config.headers = new AxiosHeaders();
    if (config.skipAuth) return config;

    if (accessToken) {
      config = assignAuthToken(config, accessToken);
    }

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const userStore = useUserStore();
    const notificationStore = useNotificationStore();

    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && userStore.refreshToken) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest && originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }

            return api(originalRequest as InternalAxiosRequestConfig);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        refreshToken(userStore.refreshToken as string)
          .then(data => {
            userStore.setAccessToken(data.access_token);
            userStore.setRefreshToken(data.refresh_token);

            processQueue(null, data.access_token);
            resolve(api(originalRequest as InternalAxiosRequestConfig));
          })
          .catch(err => {
            processQueue(err, null);
            userStore.$reset();

            notificationStore.showMessage(
              'Session expired or not found. Please log in again.',
              NotificationTypeEnum.ERROR
            );

            router.replace('/login');
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error.response?.data);
  }
);

export default api;
