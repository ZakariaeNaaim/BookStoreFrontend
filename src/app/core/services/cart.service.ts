import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShoppingCartVM } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/Customer/Cart`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<ShoppingCartVM> {
    return this.http.get<ShoppingCartVM>(this.apiUrl + '/index');
  }

  addToCart(bookId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, { bookId, quantity });
  }

  incrementQuantity(cartId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/increment/${cartId}`, {});
  }

  decrementQuantity(cartId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/decrement/${cartId}`, {});
  }

  remove(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartId}`);
  }

  getSummary(): Observable<ShoppingCartVM> {
    return this.http.get<ShoppingCartVM>(`${this.apiUrl}/summary`);
  }

  placeOrder(order: any): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/place-order`, order);
  }
}
