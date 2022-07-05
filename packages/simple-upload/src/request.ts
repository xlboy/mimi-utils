import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { UploadProgressEvent, UploadRequestOption } from './interface';

function getBody(res: AxiosResponse<any, any>) {
  const data = res.data;

  if (!data) {
    return data;
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

export default function upload(option: UploadRequestOption) {
  const formData = new FormData();

  if (option?.data) {
    Object.keys(option.data).forEach(key => {
      let value;

      if (option?.data) {
        value = option.data[key];
      }

      if (Array.isArray(value)) {
        value.forEach(item => {
          formData.append(`${key}[]`, item);
        });

        return;
      }

      formData.append(key, value as string | Blob);
    });
  }

  if (option.file instanceof Blob) {
    formData.append(option.filename, option.file, (option.file as any).name);
  } else {
    formData.append(option.filename, option.file);
  }

  axios
    .request({
      url: option.action,
      data: formData,
      headers: option.headers,
      method: option.method,
      cancelToken: new axios.CancelToken(c => {
        option.cancel = c;
      }),
      onUploadProgress: (e: UploadProgressEvent) => {
        if (e.total && e.loaded) {
          e.percent = (e.loaded / e.total) * 100;
        }

        option.onProgress(e, option.file);
      }
    })
    .then(res => {
      option.onSuccess(getBody(res));
    })
    .catch(err => {
      option.onError(err);
    });
}
