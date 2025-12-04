import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../../../core/services/book.service';
import { Book } from '../../../../core/models/book.model';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.get(+id).subscribe({
        next: (data) => (this.book = data),
        error: (err) => console.error('Error loading book details', err),
      });
    }
  }
}
