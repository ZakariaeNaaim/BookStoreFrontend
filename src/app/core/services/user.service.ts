import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, RoleManagementVM } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  lockUnlock(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/LockUnlock`, { id });
  }

  getRoleManagement(userId: string): Observable<RoleManagementVM> {
    return this.http.get<RoleManagementVM>(`${this.apiUrl}/RoleManagement?userId=${userId}`);
  }

  updateRole(userId: string, role: string, companyId?: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/RoleManagement`, { userId, role, companyId });
  }
}
