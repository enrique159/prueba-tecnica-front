import Http from "@/app/network/Http";
import Routes from "@/app/shared/routes";
import config from "../../config";
import { Response } from "../../network/domain/interfaces";
import { IHttpSettings } from "@/app/network/domain/interfaces/IHttpSettings";
import { GetInvitationsResponse, Invitation, InvitationRequest, QueryParams } from "./interfaces";

const http = new Http();

export const createInvitation = async (payload: InvitationRequest, auth: IHttpSettings): Promise<Response<Invitation>> => {
  const url = Routes.createInvitation(config.api);
  const response = await http.post<any, any>(url, { data: payload, headers: { ...auth } });
  return response;
}

export const getInvitations = async (meta: QueryParams,auth: IHttpSettings): Promise<Response<GetInvitationsResponse>> => {
  const url = Routes.getInvitations(config.api, meta);
  const response = await http.get<null, GetInvitationsResponse>(url, { headers: { ...auth } });
  return response;
}

export const getInvitation = async (id: string): Promise<Response<Invitation>> => {
  const url = Routes.getInvitation(config.api, id);
  const response = await http.get<null, Invitation>(url);
  return response;
}

export const acceptInvitation = async (id: string): Promise<Response<Array<number>>> => {
  const url = Routes.acceptInvitation(config.api, id);
  const response = await http.get<null, Array<number>>(url);
  return response;
}