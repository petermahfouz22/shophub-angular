export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: 'male' | 'female' | null;
  phone: string | null;
  birthday: string | null;
  address: string | null;
  role: 'admin' | 'customer';
  is_active: boolean;
  email_verified_at: string | null;
  provider?: string | null;
  provider_id?: string | null;
  created_at: string;
  updated_at: string;
}

// Helper to get full name
export function getFullName(user: User): string {
  return `${user.first_name} ${user.last_name}`.trim();
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  gender?: 'male' | 'female';
  phone?: string;
  birthday?: string;
  address?: string;
}

// For admin user creation
export interface CreateUserData extends UserFormData {
  password: string;
  role: 'admin' | 'customer';
  is_active: boolean;
}

// For admin user update
export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: 'male' | 'female';
  phone?: string;
  birthday?: string;
  address?: string;
  role?: 'admin' | 'customer';
  is_active?: boolean;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface UserResponse {
  success: boolean;
  data: User;
  message?: string;
}
