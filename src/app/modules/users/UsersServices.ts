import Http from "@/app/network/Http";
import Routes from "@/app/shared/routes";
import config from "../../config";
import { ISignUpRequest, ISignUpResponse, IUpdatePasswordRequest, IUpdatePasswordResponse } from "./interfaces";
import { Response } from "../../network/domain/interfaces";
import { IHttpSettings } from "@/app/network/domain/interfaces/IHttpSettings";

const http = new Http();

export const signUp = async (payload: ISignUpRequest): Promise<Response<ISignUpResponse>> => {
  const url = Routes.signUp(config.api);
  const response = await http.post<ISignUpRequest, ISignUpResponse>(url, { data: payload });
  return response;
}

export const updatePassword = async(payload: IUpdatePasswordRequest, auth: IHttpSettings): Promise<Response<IUpdatePasswordResponse>> => {
  const url = Routes.updatePassword(config.api);
  const response = await http.post<IUpdatePasswordRequest, IUpdatePasswordResponse>(url, { data: payload, headers: { ...auth } });
  return response;
}