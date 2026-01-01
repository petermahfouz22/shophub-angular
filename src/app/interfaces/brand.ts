export interface Brand {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  logo_url?: string;
  website?: string;
  status: 'active' | 'inactive';
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface BrandResponse {
  success: boolean;
  data: Brand;
  message: string;
  errors?: any;
}

export interface BrandsResponse {
  success: boolean;
  data: PaginatedBrands | Brand[];
  message?: string;
}

export interface PaginatedBrands {
  current_page: number;
  data: Brand[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}
