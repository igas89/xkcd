import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { createAction } from '@reduxjs/toolkit';

import {
  ApiAxiosParams,
  ApiActionPayload,
} from 'interfaces/api';

export const API_REQUEST = 'API_REQUEST';
const API_URL = 'https://getxkcd.now.sh';

export const apiAction = createAction(API_REQUEST, (payload: ApiActionPayload) => ({
  payload
}));

export default async function Api({
  method,
  headers,
  endpoint,
  ...props
}: ApiAxiosParams): Promise<unknown> {
  const config: AxiosRequestConfig = {
    ...props,
    baseURL: `${API_URL}${endpoint}`,
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
  };

  const instance: AxiosInstance = axios.create(config);

  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );

  const response = await instance(config);
  return response.data;
}