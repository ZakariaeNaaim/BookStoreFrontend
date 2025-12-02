import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../../../core/services/home.service';
import { Book } from '../../../../core/models/book.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-home-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss'],
})
export class HomeDetailsComponent implements OnInit {
  book: Book | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.homeService.getBookDetails(+id).subscribe({
        next: (data) => {
          this.book = data;
        },
        error: (err) => console.error('Error loading book details', err),
      });
    }
  }

  addToCart(): void {
    if (this.book) {
      this.cartService.addToCart(this.book.id, this.quantity).subscribe({
        next: () => {
          this.router.navigate(['/cart']);
        },
        error: (err) => console.error('Error adding to cart', err),
      });
    }
  }

  getMainImageUrl(book: Book): string {
    if (book.bookImages && book.bookImages.length > 0) {
      const mainImage = book.bookImages.find((img) => img.isMainImage);
      return mainImage ? mainImage.imageUrl : book.bookImages[0].imageUrl;
    }
    return 'https://placehold.co/500x600/png';
  }
}
