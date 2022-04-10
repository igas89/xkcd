import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

import { ApiAction, ApiRequestData } from 'types/api';

export const API_REQUEST = 'API_REQUEST';
const API_URL = 'https://getxkcd.now.sh/api/comic';

export const apiAction = <T>(requestData: ApiRequestData<T>): ApiAction<T> => ({
  type: API_REQUEST,
  requestData,
});

export default async function Api<T>({
  method,
  headers,
  ...props
}: AxiosRequestConfig): Promise<T> {
  const config: AxiosRequestConfig = {
    ...props,
    baseURL: API_URL,
    method: method || 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
  };

  const instance: AxiosInstance = axios.create(config);

  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject({
      code: error.response?.status || 404,
      message: `Ошибка в запросе ${error.message}`,
    }),
  );

  const response = await instance(config);
  return response.data;
}