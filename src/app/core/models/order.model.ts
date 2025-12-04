import { Book } from './book.model';
import { User } from './user.model';

export interface OrderHeader {
  id: number;
  applicationUserId: string;
  user?: User;
  orderDate: string;
  shippingDate: string;
  orderTotal: number;
  orderStatus: string;
  paymentStatus: string;
  trackingNumber?: string;
  carrier?: string;
  paymentDate: string;
  paymentDueDate: string;
  sessionId?: string;
  paymentIntentId?: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  name: string;
}

export interface OrderDetail {
  id: number;
  orderHeaderId: number;
  bookId: number;
  book?: Book;
  count: number;
  price: number;
}

export interface OrderVM {
  orderHeader: OrderHeader;
  orderDetails: OrderDetail[];
}
