import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BookService } from '../../../../core/services/book.service';

@Component({
  selector: 'app-admin-book-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private router = inject(Router);

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    imageUrl: [''],
    categoryId: [1, Validators.required], // Default to 1 for now
  });

  onSubmit() {
    if (this.bookForm.valid) {
      this.bookService.createBook(this.bookForm.value as any).subscribe({
        next: () => this.router.navigate(['/admin/books']),
        error: (err) => console.error('Failed to create book', err),
      });
    }
  }
}
