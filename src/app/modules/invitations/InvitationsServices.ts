import Http from "@/app/network/Http";
import Routes from "@/app/shared/routes";
import config from "../../config";
import { Response } from "../../network/domain/interfaces";
import { IHttpSettings } from "@/app/network/domain/interfaces/IHttpSettings";
import { Invitation, InvitationRequest } from "./interfaces";

const http = new Http();

export const createInvitation = async (payload: InvitationRequest, auth: IHttpSettings): Promise<Response<Invitation>> => {
  const url = Routes.createInvitation(config.api);
  const response = await http.post<any, any>(url, { data: payload, headers: { ...auth } });
  return response;
}