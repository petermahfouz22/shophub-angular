import { User } from './user';
export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface GoogleAuthResponse {
  success: boolean;
  url: string;
  message?: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
