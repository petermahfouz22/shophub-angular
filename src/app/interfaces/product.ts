export interface Product {
  id?: number;
  name: string;
  description: string;
  category_id: number;
  brand_id: number;
  price: number;
  discount_price?: number;
  stock: number;
  sku: string;
  image_url?: string;
  gallery?: string[];
  rating?: number;
  status: 'active' | 'inactive';
  category?: Category;
  brand?: Brand;
}

export interface Category {
  id: number;
  name: string;
  status: string;
}

export interface Brand {
  id: number;
  name: string;
  status: string;
}

export interface ProductFormData {
  categories: Category[];
  brands: Brand[];
}