import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../../core/models/book.model';
import { HomeService } from '../../../core/services/home.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private homeService: HomeService,
    private cartService: CartService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

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

  quickAddToCart(book: Book): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.toastr.warning('Please login to add items to cart', 'Authentication Required');
      this.router.navigate(['/identity/login']);
      return;
    }

    this.cartService.addToCart(book.id, 1).subscribe({
      next: (message) => {
        this.toastr.success(`${book.title} added to cart!`, 'Success');
      },
      error: (err) => {
        console.error('Error adding to cart', err);
        this.toastr.error('Failed to add item to cart. Please try again.', 'Error');
      },
    });
  }

  getMainImageUrl(book: Book): string {
    if (book.mainImageUrl) {
      return book.mainImageUrl;
    }
    return 'https://placehold.co/500x600/png';
  }
}
