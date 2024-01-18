import Http from "@/app/network/Http";
import Routes from "@/app/shared/routes";
import config from "../../config";
import { ISignUpRequest, ISignUpResponse } from "./interfaces";
import { Response } from "../../network/domain/interfaces";

const http = new Http();

export const signUp = async (payload: ISignUpRequest): Promise<Response<ISignUpResponse>> => {
  const url = Routes.signUp(config.api);
  const response = await http.post<ISignUpRequest, ISignUpResponse>(url, { data: payload });
  return response;
}