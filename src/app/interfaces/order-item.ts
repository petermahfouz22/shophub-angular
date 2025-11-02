import { Product } from './product';

export interface OrderItem extends Product {
  quantity: number;
}
