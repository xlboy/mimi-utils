import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { UploadRequestOption } from './interface';

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
  axios
    .request({
      ...option,
      cancelToken: new axios.CancelToken(c => {
        option.cancel = c;
      })
    })
    .then(res => {
      option.onSuccess(getBody(res));
    })
    .catch(err => {
      option.onError(err);
    });
}
