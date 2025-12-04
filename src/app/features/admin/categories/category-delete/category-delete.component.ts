import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../../../core/models/category.model';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-category-delete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss'],
})
export class CategoryDeleteComponent implements OnInit {
  category: Category | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.get(+id).subscribe({
        next: (data) => (this.category = data),
        error: (err) => console.error('Error loading category for delete', err),
      });
    }
  }

  onDelete(): void {
    if (this.category) {
      this.categoryService.delete(this.category.id).subscribe({
        next: () => this.router.navigate(['/admin/categories']),
        error: (err) => console.error('Error deleting category', err),
      });
    }
  }
}
