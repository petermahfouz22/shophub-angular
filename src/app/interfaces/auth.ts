import { User } from './user';

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  gender?: 'male' | 'female';
  birthday?: string;
  phone?: string;
}

export interface RegisterResponse {
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

export interface ResetPasswordData {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}
