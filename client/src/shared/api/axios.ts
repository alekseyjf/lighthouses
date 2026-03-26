import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { authStore } from '../../store/authStore';

/** Shared HTTP client: attaches Bearer token; on 401, refreshes once and retries (simple request queue). */
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }

  return config;
});

let isRefreshing = false;
let queue: any[] = [];

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(resolve => {
          queue.push(() => resolve(api(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        await authStore.refresh();

        queue.forEach(cb => cb());
        queue = [];

        return api(originalRequest);
      } catch {
        authStore.logout();
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;