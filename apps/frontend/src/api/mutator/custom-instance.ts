import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const BACKEND_URL = 'http://localhost:8787'

interface CustomRequestConfig extends Omit<AxiosRequestConfig, 'url' | 'method'> {
  url: string
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  params?: Record<string, unknown>
  data?: unknown
}

export const customInstance = <T>({
  url,
  method,
  params,
  data,
}: CustomRequestConfig): Promise<T> => {
  return axios({
    url,
    method,
    params,
    data,
    baseURL: BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res: AxiosResponse<T>) => res.data)
}
