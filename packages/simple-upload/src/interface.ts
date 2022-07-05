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

export type ProcessFileType = {
  data: Record<string, unknown> | any;
  parsedFile: SimpleFile | any;
  origin: SimpleFile | any;
};

export type BeforeUploadFileType = File | Blob | boolean | string;

export type SimpleUploadOptionsType = {
  action: string;
  name?: 'File';
  method: UploadRequestMethod;
  beforeUpload?: (
    files: SimpleFile,
    fileList: SimpleFile[]
  ) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>;
  headers?: AxiosRequestHeaders;
  onProgress?: (progressEvent: UploadProgressEvent, file: File) => void;
  onSuccess: (res: AxiosResponse<any, any>) => void;
  onError?: (error: any) => void;
  data?: (file: File) => Promise<Record<string, unknown>> | Record<string, unknown> | Promise<Record<string, unknown>>;
  //Todo：目前未想好怎么设计
  done?: (file: File[] | File) => void;
};

export interface UploadRequestOption {
  action: string;
  filename: string;
  data?: Record<string, unknown>;
  file: SimpleFile;
  headers?: AxiosRequestHeaders;
  method: UploadRequestMethod;
  onProgress: (progressEvent: UploadProgressEvent, file: SimpleFile) => void;
  onSuccess: (ret: any) => void;
  onError: (err: UploadRequestError) => void;
  cancel?: Canceler;
}
