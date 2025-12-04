import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Book } from '../../../../core/models/book.model';
import { Category } from '../../../../core/models/category.model';
import { BookService } from '../../../../core/services/book.service';
// import { CategoryService } from '../../../core/services/category.service'; // Assuming this exists or will be created

@Component({
  selector: 'app-book-upsert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-upsert.component.html',
  styleUrls: ['./book-upsert.component.scss'],
})
export class BookUpsertComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  bookId: number = 0;
  categories: Category[] = []; // Populate this from service
  book: Book | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router // private categoryService: CategoryService
  ) {
    this.bookForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      description: [''],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      listPrice: [0, [Validators.required, Validators.min(0)]],
      price50: [0, [Validators.required, Validators.min(0)]],
      price100: [0, [Validators.required, Validators.min(0)]],
      categoryId: [0, [Validators.required, Validators.min(1)]],
      mainImage: [null], // File input
      bookImages: [null], // Multiple files
    });
  }

  ngOnInit(): void {
    // this.loadCategories();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.bookId = +params['id'];
        this.loadBook(this.bookId);
      }
    });
  }

  loadBook(id: number): void {
    this.bookService.get(id).subscribe({
      next: (book) => {
        this.book = book;
        this.bookForm.patchValue(book);
        // Handle images display separately if needed
      },
      error: (err) => console.error('Error loading book', err),
    });
  }

  // loadCategories() { ... }

  onMainImageSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.bookForm.patchValue({
        mainImage: file,
      });
    }
  }

  onBookImagesSelected(event: any): void {
    if (event.target.files.length > 0) {
      // Handle multiple files
      // This might need a different approach for FormData
    }
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.bookForm.controls).forEach((key) => {
      const value = this.bookForm.get(key)?.value;
      if (key === 'mainImage' || key === 'bookImages') {
        // Handle files specifically
        // For now, let's assume simple binding or specific file handling logic
        // This part needs careful implementation for FormData
      } else {
        formData.append(key, value);
      }
    });

    // Append files manually if they exist in component state or form control
    const mainImage = this.bookForm.get('mainImage')?.value;
    if (mainImage instanceof File) {
      formData.append('mainImage', mainImage);
    }

    if (this.isEditMode) {
      this.bookService.update(this.bookId, formData).subscribe({
        next: () => this.router.navigate(['/admin/books']),
        error: (err) => console.error('Error updating book', err),
      });
    } else {
      this.bookService.create(formData).subscribe({
        next: () => this.router.navigate(['/admin/books']),
        error: (err) => console.error('Error creating book', err),
      });
    }
  }
}
