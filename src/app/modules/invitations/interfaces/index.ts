export interface Invitations {
  invitations: Invitation[];
}

export interface Invitation {
  id: string;
  guestName: string;
  date: string;
  hour: string;
  caducity: string;
  status: string;
  userId: string;
}

export interface InvitationId {
  id: string;
}

export interface InvitationRequest {
  guestName: string;
  date: string;
  hour: string;
  caducity: string;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: string;
}

export interface GetInvitationsResponse {
  count: number;
  rows: Invitation[];
}