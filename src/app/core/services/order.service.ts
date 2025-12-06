import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderVM } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/admin/Orders`;

  constructor(private http: HttpClient) {}

  getAll(status: string = 'all'): Observable<OrderVM[]> {
    let params = new HttpParams().set('status', status);
    return this.http.get<OrderVM[]>(this.apiUrl, { params });
  }

  get(id: number): Observable<OrderVM> {
    return this.http.get<OrderVM>(`${this.apiUrl}/${id}`);
  }

  updateOrderDetails(orderVM: OrderVM): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/UpdateOrderDetails`, orderVM);
  }

  updateStatus(id: number, orderStatus: string, paymentStatus?: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/UpdateStatus`, { id, orderStatus, paymentStatus });
  }

  startProcessing(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/StartProcessing`, { id });
  }

  shipOrder(orderVM: OrderVM): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/ShipOrder`, orderVM);
  }

  cancelOrder(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/CancelOrder`, { id });
  }
}
