import { Component, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../../../core/services/book.service';
import { Book } from '../../../../core/models/book.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  private bookService = inject(BookService);
  book = signal<Book | null>(null);

  @Input()
  set id(bookId: string) {
    this.bookService.get(+bookId).subscribe({
      next: (book) => this.book.set(book),
      error: (err) => console.error('Failed to load book', err),
    });
  }
}
