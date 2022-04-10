import { AxiosRequestConfig } from 'axios';
import { Action } from 'redux';

export interface ApiAction<T> extends Action<string> {
  requestData: ApiRequestData<T>;
}

export interface ApiRequestData<T> extends Action<string[]> {
  payload: ApiRequestConfig<T>;
}

export interface ApiRequestConfig<T> extends Omit<AxiosRequestConfig, 'url' | 'baseURL'> {
  params?: T;
  data?: T;
}

export interface ApiProps extends RequestInit {
  url: string;
}