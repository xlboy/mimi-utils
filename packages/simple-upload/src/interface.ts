import type { AxiosRequestHeaders, AxiosResponse, Canceler } from 'axios';

export interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number;
}

export interface SimpleFile extends File {
  uid: string;
}

export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';

export interface UploadRequestError extends Error {
  status?: number;
  method?: UploadRequestMethod;
  url?: string;
}

export type SimpleUploadOptionsType = {
  action: string;
  accept?: string; // 文件类型
  name: 'File';
  method: UploadRequestMethod;
  beforeUpload?: (files: File, fileList: File[]) => Promise<File>;
  headers?: AxiosRequestHeaders;
  onProgress?: (progressEvent: any, file: File) => void;
  afterUpload?: (file: File) => void;
  onSuccess: (res: AxiosResponse<any, any>) => void;
  onError: (error: any) => void;
  data?: (file: File) => Promise<Record<string, unknown>> | Record<string, unknown> | Promise<Record<string, unknown>>;
  done?: (file: File[] | File) => void;
};

export interface UploadRequestOption {
  action: string;
  filename: string;
  data?: Record<string, unknown>;
  file: SimpleFile;
  headers?: AxiosRequestHeaders;
  method: UploadRequestMethod;
  onProgress: (e: UploadProgressEvent) => void;
  onSuccess: (ret: any) => void;
  onError: (err: UploadRequestError) => void;
  cancel?: Canceler;
}
