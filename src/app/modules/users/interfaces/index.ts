import { User } from "@/types/User.type";

export interface ISignUpRequest {
  name: string;
  lastname: string;
  email: string;
  password: string;
  department: number;
}

export interface ISignUpResponse {
  user: User;
}

export interface IUpdatePasswordRequest {
  password: string
}

export interface IUpdatePasswordResponse {
  user: Partial<User>
}