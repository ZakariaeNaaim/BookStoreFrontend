import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Category } from '../models/category.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiService = inject(ApiService);

  getCategories() {
    return this.apiService.get<Category[]>(API_CONFIG.endpoints.categories);
  }

  getCategory(id: number) {
    return this.apiService.get<Category>(`${API_CONFIG.endpoints.categories}/${id}`);
  }

  createCategory(category: Category) {
    return this.apiService.post<Category>(API_CONFIG.endpoints.categories, category);
  }

  updateCategory(id: number, category: Category) {
    return this.apiService.put<Category>(`${API_CONFIG.endpoints.categories}/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.apiService.delete<void>(`${API_CONFIG.endpoints.categories}/${id}`);
  }
}
