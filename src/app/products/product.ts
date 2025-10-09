export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew: boolean;
}
export interface FilterState {
  categories: string[];
  maxPrice: number;
  minRating: number;
}
export interface category {
  name: string;
  count: number;
}
// interface reviews {
//   user: string;
//   comment: string;
//   rating: number;
//   date: string;
// }
