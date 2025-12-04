import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../../core/services/book.service';
import { Book } from '../../../../core/models/book.model';

@Component({
  selector: 'app-admin-book-index',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  private bookService = inject(BookService);
  books = signal<Book[]>([]);
  displayedColumns: string[] = ['id', 'title', 'author', 'price', 'actions'];

  constructor() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAll().subscribe({
      next: (books) => this.books.set(books),
      error: (err) => console.error('Failed to load books', err),
    });
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.delete(id).subscribe({
        next: () => this.loadBooks(),
        error: (err) => console.error('Failed to delete book', err),
      });
    }
  }
}
