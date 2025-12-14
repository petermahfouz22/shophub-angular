export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  image_url: string | null;
  status: 'active' | 'inactive';
  parent?: Category;
  children?: Category[];
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface CategoriesResponse {
  success: boolean;
  data: {
    data: Category[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}