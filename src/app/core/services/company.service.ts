import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/admin/Companies`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  get(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`);
  }

  create(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company);
  }

  update(id: number, company: Company): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, company);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
