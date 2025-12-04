import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ShoppingCartVM } from '../../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartVM: ShoppingCartVM | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cartVM = data;
      },
      error: (err) => console.error('Error loading cart', err),
    });
  }

  increment(cartId: number): void {
    this.cartService.incrementQuantity(cartId).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error incrementing quantity', err),
    });
  }

  decrement(cartId: number): void {
    this.cartService.decrementQuantity(cartId).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error decrementing quantity', err),
    });
  }

  remove(cartId: number): void {
    this.cartService.remove(cartId).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error removing item', err),
    });
  }

  getMainImageUrl(cart: any): string {
    if (cart.book?.bookImages && cart.book.bookImages.length > 0) {
      const mainImage = cart.book.bookImages.find((img: any) => img.isMainImage);
      return mainImage ? mainImage.imageUrl : cart.book.bookImages[0].imageUrl;
    }
    return 'https://placehold.co/500x600/png';
  }
}
