import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-category-upsert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './category-upsert.component.html',
  styleUrls: ['./category-upsert.component.scss'],
})
export class CategoryUpsertComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode = false;
  categoryId: number = 0;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      displayOrder: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.categoryId = +params['id'];
        this.loadCategory(this.categoryId);
      }
    });
  }

  loadCategory(id: number): void {
    this.categoryService.get(id).subscribe({
      next: (category) => {
        this.categoryForm.patchValue(category);
      },
      error: (err) => console.error('Error loading category', err),
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const category: Category = this.categoryForm.value;

    if (this.isEditMode) {
      this.categoryService.update(this.categoryId, category).subscribe({
        next: () => this.router.navigate(['/admin/categories']),
        error: (err) => console.error('Error updating category', err),
      });
    } else {
      this.categoryService.create(category).subscribe({
        next: () => this.router.navigate(['/admin/categories']),
        error: (err) => console.error('Error creating category', err),
      });
    }
  }
}
