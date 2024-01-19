import Http from '@/app/network/Http';
import Routes from '@/app/shared/routes'
import config from '../config';
import { IRecoverPasswordResponse, ISignInRequest, ISignInResponse } from './interfaces';
import { Response } from '../network/domain/interfaces';
import { IHttpSettings } from '../network/domain/interfaces/IHttpSettings';

const http = new Http();

export const signIn = async (payload: ISignInRequest): Promise<Response<ISignInResponse>> => {
  const url = Routes.signIn(config.api);
  const response = await http.post<ISignInRequest, ISignInResponse>(url, { data: payload });
  return response;
}

export const signOut = async (auth: IHttpSettings): Promise<Response<null>> => {
  const url = Routes.signOut(config.api);
  const response = await http.post<{}, null>(url, { headers: { ...auth }});
  return response;
}

export const recoverPassword = async (email: string): Promise<Response<IRecoverPasswordResponse>> => {
  const url = Routes.recoverPassword(config.api, email)
  const response = await http.get<string, IRecoverPasswordResponse>(url);
  return response;
}