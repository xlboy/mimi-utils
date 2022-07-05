import type {
  SimpleUploadOptionsType,
  SimpleFile,
  UploadRequestError,
  UploadRequestOption,
  ProcessFileType,
  UploadProgressEvent
} from './interface';
import request from './request';
import getUid from './utils';

export class SimpleUpload {
  options: SimpleUploadOptionsType;

  reqs: any = {};

  constructor(options: SimpleUploadOptionsType) {
    this.options = options;
  }

  processFile = async (file: SimpleFile, fileList: SimpleFile[]): Promise<ProcessFileType> => {
    const { beforeUpload } = this.options;
    let transformedFile: any | void = file;

    if (beforeUpload) {
      try {
        transformedFile = await beforeUpload(file, fileList);
      } catch (e) {
        transformedFile = false;
        console.warn('beforeUpload error: ', e);
      }

      if (transformedFile === false) {
        return {
          origin: file,
          parsedFile: null,
          data: null
        };
      }
    }

    const { data } = this.options;
    let mergedData: Record<string, unknown> | any;

    if (typeof data === 'function') {
      mergedData = await data(file);
    } else {
      mergedData = data;
    }

    const parsedData =
      (typeof transformedFile === 'object' || typeof transformedFile === 'string') && transformedFile
        ? transformedFile
        : file;

    let parsedFile: File;

    if (parsedData instanceof File) {
      parsedFile = parsedData;
    } else {
      parsedFile = new File([parsedData], file.name, { type: file.type });
    }

    const mergedParsedFile: SimpleFile = parsedFile as SimpleFile;

    mergedParsedFile.uid = file.uid;

    return {
      origin: file,
      data: mergedData,
      parsedFile: mergedParsedFile
    };
  };

  async upload(files: File[]) {
    const originFiles = [...files] as SimpleFile[];
    const postFiles = originFiles.map(file => {
      file.uid = getUid();

      return this.processFile(file, originFiles);
    });

    Promise.all(postFiles).then(fileList => {
      fileList
        .filter(file => file.parsedFile !== null)
        .forEach(file => {
          this.post(file);
        });
    });
  }

  post({ data, origin, parsedFile }: ProcessFileType) {
    const { uid } = origin;

    const { headers, method, name = 'File', action } = this.options;

    const requestOption: UploadRequestOption = {
      action,
      filename: name,
      data,
      file: parsedFile,
      headers,
      method: method || 'post',
      onProgress: (progressEvent: UploadProgressEvent) => {
        const { onProgress } = this.options;

        onProgress?.(progressEvent, parsedFile);
      },
      onSuccess: (ret: any) => {
        const { onSuccess } = this.options;

        onSuccess?.(ret);
        delete this.reqs[uid];
      },
      onError: (err: UploadRequestError) => {
        const { onError } = this.options;

        onError?.(err);
        delete this.reqs[uid];
      },
      cancel: undefined
    };

    this.reqs[uid] = request(requestOption);
  }

  cancel(file?: any) {
    const { reqs } = this;

    if (file) {
      const uid = file.uid ? file.uid : file;

      if (reqs[uid] && reqs[uid].cancel) {
        reqs[uid].cancel();
      }

      delete reqs[uid];
    } else {
      Object.keys(reqs).forEach(uid => {
        if (reqs[uid] && reqs[uid].cancel) {
          reqs[uid].cancel();
        }

        delete reqs[uid];
      });
    }
  }
}

new SimpleUpload({} as any);
