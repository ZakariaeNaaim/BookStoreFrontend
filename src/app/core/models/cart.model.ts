import { Book } from './book.model';
import { Order } from './order.model';

export interface ShoppingCart {
  id: number;
  bookId: number;
  book?: Book;
  quantity: number;
  userId: string;
  price: number;
}

export interface ShoppingCartVM {
  lstShoppingCarts: ShoppingCart[];
  order: Order;
}
