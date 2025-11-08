export interface User {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female';
  phone: string;
  birthday: string;
  address: string;
  email_verified_at: string | null;
  provider?: string;
  provider_id?: string;
  created_at: string;
  updated_at: string;
}

export interface UserFormData {
  name: string;
  email: string;
  gender: 'male' | 'female';
  phone: string;
  birthday: string;
  address: string;
}

export interface UsersResponse {
  success: boolean;
  message:string
  data: User[];
}

export interface UserResponse {
  success: boolean;
  data: User;
  message?: string;
}
