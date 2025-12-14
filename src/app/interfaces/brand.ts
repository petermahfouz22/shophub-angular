export interface Brand {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  logo_url?: string;
  website?: string;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}
export interface BrandResponse {
  success: boolean;
  data: any;
  message: string;
  errors?: any;
}

export interface PaginatedBrands {
  current_page: number;
  data: Brand[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}