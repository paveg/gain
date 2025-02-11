import axios from 'axios'

const BACKEND_URL = 'http://localhost:8787'

export const customInstance = <T>({ url, method, params, data }: any): Promise<T> => {
  return axios({
    url,
    method,
    params,
    data,
    baseURL: BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.data)
}
