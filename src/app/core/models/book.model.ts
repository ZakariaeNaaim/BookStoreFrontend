import { Category } from './category.model';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  isbn: string;
  listPrice: number;
  price: number;
  price50: number;
  price100: number;
  categoryId: number;
  category?: Category;
  bookImages?: BookImage[];
}

export interface BookImage {
  id: number;
  imageUrl: string;
  bookId: number;
  isMainImage: boolean;
}
