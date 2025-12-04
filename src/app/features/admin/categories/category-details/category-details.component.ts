import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Category } from '../../../../core/models/category.model';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  category: Category | null = null;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.get(+id).subscribe({
        next: (data) => (this.category = data),
        error: (err) => console.error('Error loading category details', err),
      });
    }
  }
}
