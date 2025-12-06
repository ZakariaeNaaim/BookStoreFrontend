import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, RoleManagementVM } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/admin/Users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  lockUnlock(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/lock-unlock?id=${id}`,
      {}
    );
  }

  getRoleManagement(userId: string): Observable<RoleManagementVM> {
    return this.http.get<RoleManagementVM>(`${this.apiUrl}/${userId}/permissions`);
  }

  updateRole(data: {
    id: number;
    role: string;
    companyId?: number;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/change-permission`,
      data
    );
  }
}
