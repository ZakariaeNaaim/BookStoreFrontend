import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../../../core/models/book.model';
import { BookService } from '../../../../core/services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'isbn', 'price', 'category', 'actions'];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error loading books', err);
      },
    });
  }

  deleteBook(id: number): void {
    // This will be handled by the delete component/modal later,
    // but for now we can just have a placeholder or direct call if we want.
    // The plan says "BookDeleteComponent", so we'll route to it.
  }
}
