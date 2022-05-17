import { AxiosRequestConfig } from 'axios';

export interface ApiAxiosParams extends AxiosRequestConfig {
  endpoint: string;
}

export interface ApiActionPayload extends Pick<ApiAxiosParams,
  'headers'
  | 'endpoint'
  | 'method'
  | 'params'
  | 'data'
> {
  types: [string, string, string];
  payload?: unknown;
}

export interface ApiResponseError {
  code: number;
  status: string;
  message: string;
}