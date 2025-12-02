import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../../../core/services/book.service';
import { Book } from '../../../../core/models/book.model';

@Component({
  selector: 'app-book-delete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.scss'],
})
export class BookDeleteComponent implements OnInit {
  book: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.get(+id).subscribe({
        next: (data) => (this.book = data),
        error: (err) => console.error('Error loading book for delete', err),
      });
    }
  }

  onDelete(): void {
    if (this.book) {
      this.bookService.delete(this.book.id).subscribe({
        next: () => this.router.navigate(['/admin/books']),
        error: (err) => console.error('Error deleting book', err),
      });
    }
  }
}
