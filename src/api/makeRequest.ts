import axios, { AxiosProgressEvent } from 'axios';

export interface MakeRequest {
  url?: string;
  baseURL?: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  params?: unknown;
  data?: unknown;
  headers?: Record<string, string | number | boolean>;
  authorization?: boolean;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream';
}

export default async <R>({
  url = '/',
  method = 'get',
  params = {},
  data,
  headers = {},
  responseType = 'json',
  onUploadProgress,
}: MakeRequest): Promise<R> => {
  try {
    const response = await axios({
      url,
      method,
      params,
      data,
      headers,
      responseType,
      onUploadProgress,
    });

    if (responseType === 'blob') {
      return response.data;
    }

    return response.data;
  } catch (e) {
    let message;
    if (e instanceof Error) {
      message = e.message;
    } else {
      message = 'Unknown error';
    }
    throw new Error(message);
  }
};
