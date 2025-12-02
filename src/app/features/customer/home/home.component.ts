import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book } from '../../../core/models/book.model';
import { HomeService } from '../../../core/services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.homeService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error loading books', err);
      },
    });
  }

  getMainImageUrl(book: Book): string {
    if (book.bookImages && book.bookImages.length > 0) {
      const mainImage = book.bookImages.find((img) => img.isMainImage);
      return mainImage ? mainImage.imageUrl : book.bookImages[0].imageUrl;
    }
    return 'https://placehold.co/500x600/png';
  }
}
