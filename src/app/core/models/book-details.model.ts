export interface BookDetailsForAdmin {
  id: number;
  title: string;
  description: string;
  isbn: string;
  author: string;
  listPrice: number;
  price: number;
  price50: number;
  price100: number;
  category: string;
  bookImages: BookImage[];
}

// book-details-dto.model.ts
import { BookImage } from './book.model';

export interface BookDetails {
  bookDetails: BookDetailsForAdmin;
  quantity: number;
}
