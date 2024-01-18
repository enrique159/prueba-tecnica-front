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