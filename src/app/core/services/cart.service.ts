import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShoppingCartVM, ShoppingCart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/Customer/Cart`;
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  public cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshCartCount();
  }

  getCart(): Observable<ShoppingCartVM> {
    return this.http.get<ShoppingCartVM>(this.apiUrl + '/index');
  }

  addToCart(bookId: number, quantity: number): Observable<string> {
    return this.http
      .post<string>(`${this.apiUrl}/add`, { bookId, quantity })
      .pipe(tap(() => this.refreshCartCount()));
  }

  incrementQuantity(cartId: number): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/increment/${cartId}`, {})
      .pipe(tap(() => this.refreshCartCount()));
  }

  decrementQuantity(cartId: number): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/decrement/${cartId}`, {})
      .pipe(tap(() => this.refreshCartCount()));
  }

  remove(cartId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${cartId}`)
      .pipe(tap(() => this.refreshCartCount()));
  }

  getSummary(): Observable<ShoppingCartVM> {
    return this.http.get<ShoppingCartVM>(`${this.apiUrl}/summary`);
  }

  placeOrder(order: any): Observable<{ checkoutUrl?: string }> {
    return this.http.post<{ checkoutUrl?: string }>(`${this.apiUrl}/place-order`, order);
  }

  refreshCartCount(): void {
    this.getCart().subscribe({
      next: (cart) => {
        const count =
          cart.lstShoppingCarts?.reduce(
            (sum: number, item: ShoppingCart) => sum + item.quantity,
            0
          ) || 0;
        this.cartItemCountSubject.next(count);
      },
      error: () => {
        this.cartItemCountSubject.next(0);
      },
    });
  }

  getCartItemCount(): number {
    return this.cartItemCountSubject.value;
  }

  clearCart(): void {
    this.cartItemCountSubject.next(0);
  }
}
