import { User } from "@/types/User.type";

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
  user: User;
}

export interface IRecoverPasswordResponse {
  user: Partial<User>;
  emailSent: boolean;
}