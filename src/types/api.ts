import { AxiosRequestConfig } from 'axios';

export interface ApiAction<T> {
    type: string;
    requestData: ApiRequestData<T>;
}

export interface ApiRequestData<T> {
    type: string[];
    payload: ApiRequestConfig<T>;
}

export interface ApiRequestConfig<T> extends Omit<AxiosRequestConfig, 'url' | 'baseURL'> {
    params?: T,
    data?: T,
}

export interface ApiProps extends RequestInit {
    url: string;
}