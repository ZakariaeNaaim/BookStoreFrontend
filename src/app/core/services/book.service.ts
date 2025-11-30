import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Book } from '../models/book.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiService = inject(ApiService);

  getBooks() {
    return this.apiService.get<Book[]>(API_CONFIG.endpoints.books);
  }

  getBook(id: number) {
    return this.apiService.get<Book>(`${API_CONFIG.endpoints.books}/${id}`);
  }

  createBook(book: Book) {
    return this.apiService.post<Book>(API_CONFIG.endpoints.books, book);
  }

  updateBook(id: number, book: Book) {
    return this.apiService.put<Book>(`${API_CONFIG.endpoints.books}/${id}`, book);
  }

  deleteBook(id: number) {
    return this.apiService.delete<void>(`${API_CONFIG.endpoints.books}/${id}`);
  }
}
