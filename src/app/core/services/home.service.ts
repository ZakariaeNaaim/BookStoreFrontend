import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Book } from '../models/book.model';
import { BookDetails } from '../models/book-details.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}/Customer/Home`;

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/index');
  }

  getBookDetails(id: number): Observable<BookDetails> {
    return this.http.get<BookDetails>(`${this.apiUrl}/details/${id}`);
  }
}
