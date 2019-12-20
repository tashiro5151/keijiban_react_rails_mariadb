import { constant } from 'src/constant';

export const get_request = <T>(params: { url: string }): Promise<T> => {
  return new Promise(resolve => {
    fetch(params.url, {
      method: 'get',
      headers: constant.HEADER
    })
      .then(async res => {
        if (res.status !== 200) {
          resolve();
        }

        resolve((await res.json()) as T);
      })
      .catch(err => {
        resolve();
      });
  });
};

export const post_request = <T>(params: {
  url: string;
  body: string;
}): Promise<T> => {
  return new Promise(resolve => {
    fetch(params.url, {
      method: 'post',
      headers: constant.HEADER,
      body: params.body
    })
      .then(async res => {
        if (res.status !== 200) {
          resolve();
        }

        resolve((await res.json()) as T);
      })
      .catch(err => {
        resolve();
      });
  });
};
