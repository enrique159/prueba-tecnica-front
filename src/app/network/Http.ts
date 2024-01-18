import axios, { AxiosInstance, AxiosError, RawAxiosRequestHeaders } from 'axios'
import { IHttp } from './domain/interfaces/IHttp';

import type { Response } from './domain/interfaces';
import type { IPayload } from './domain/interfaces';
import Exception from '../shared/error/Exception';
import HttpStatusCode from '../shared/enums/httpStatusCode';
import ErrorCode from '../shared/error/ErrorCodes';

const TIME_OUT = 30000

export default class Http implements IHttp {
  private axios!: AxiosInstance

  private requestHeaders = (headers: RawAxiosRequestHeaders) => {
    return {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }

  constructor() {
    this.instanceAxios()
  }

  private instanceAxios() {
    this.axios = axios.create()
  }

  /*
    *********** GET ***********
  */
  async get<T, U>(url: string, payload?: IPayload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.get(url, {
        params: payload?.params,
        headers: this.requestHeaders(payload?.headers ?? {}),
        timeout: payload?.timeout ?? TIME_OUT,
        data: payload?.data ?? null,
      })

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ECONNABORTED') {
          throw new Exception(HttpStatusCode.REQUEST_TIMEOUT, [ErrorCode.ERR0020])
        }
        throw new Exception(err.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR, err.response?.data.error ?? [])
      }
      else {
        console.log('🚨 Unexpected error: ', err)
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0000])
      }
    }
  }


  /*
    *********** POST ***********
  */
  async post<T, U>(url: string, payload?: IPayload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.post(url, payload?.data ?? null, {
        params: payload?.params,
        headers: this.requestHeaders(payload?.headers ?? {}),
        data: payload?.data ?? null,
        timeout: payload?.timeout ?? TIME_OUT,
      })

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ECONNABORTED') {
          throw new Exception(HttpStatusCode.REQUEST_TIMEOUT, [ErrorCode.ERR0020])
        }
        throw new Exception(err.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR, err.response?.data.error ?? [])
      }
      else {
        console.log('🚨 Unexpected error: ', err)
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0000])
      }
    }
  }


  /*
    *********** PUT ***********
  */
  async put<T, U>(url: string, payload?: IPayload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.put(url, payload?.data ?? null, {
        params: payload?.params,
        headers: this.requestHeaders(payload?.headers ?? {}),
        data: payload?.data ?? null,
        timeout: payload?.timeout ?? TIME_OUT,
      })

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ECONNABORTED') {
          throw new Exception(HttpStatusCode.REQUEST_TIMEOUT, [ErrorCode.ERR0020])
        }
        throw new Exception(err.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR, err.response?.data.error ?? [])
      }
      else {
        console.log('🚨 Unexpected error: ', err)
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0000])
      }
    }
  }


  /*
    *********** DELETE ***********
  */
  async delete<T, U>(url: string, payload?: IPayload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.delete(url, {
        params: payload?.params,
        headers: this.requestHeaders(payload?.headers ?? {}),
        timeout: payload?.timeout ?? TIME_OUT,
      })

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ECONNABORTED') {
          throw new Exception(HttpStatusCode.REQUEST_TIMEOUT, [ErrorCode.ERR0020])
        }
        throw new Exception(err.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR, err.response?.data.error ?? [])
      }
      else {
        console.log('🚨 Unexpected error: ', err)
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0000])
      }
    }
  }


  /*
    *********** PATCH ***********
  */
  async patch<T, U>(url: string, payload?: IPayload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.patch(url, {
        params: payload?.params,
        headers: this.requestHeaders(payload?.headers ?? {}),
        data: payload?.data ?? null,
        timeout: payload?.timeout ?? TIME_OUT,
      })

      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === 'ECONNABORTED') {
          throw new Exception(HttpStatusCode.REQUEST_TIMEOUT, [ErrorCode.ERR0020])
        }
        throw new Exception(err.response?.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR, err.response?.data.error ?? [])
      }
      else {
        console.log('🚨 Unexpected error: ', err)
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0000])
      }
    }
  }
}