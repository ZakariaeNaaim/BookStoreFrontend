import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/admin/Books`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http
      .get<{ success: boolean; data: Book[] }>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  get(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  create(book: FormData): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  update(id: number, book: FormData): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, book);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/images/${imageId}`);
  }

  setMainImage(imageId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/images/${imageId}/setMain`, {});
  }
}
