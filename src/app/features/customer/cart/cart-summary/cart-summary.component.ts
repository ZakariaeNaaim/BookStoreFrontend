import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../../core/services/cart.service';
import { ShoppingCartVM } from '../../../../core/models/cart.model';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  cartVM: ShoppingCartVM | null = null;
  summaryForm: FormGroup;

  constructor(private cartService: CartService, private fb: FormBuilder, private router: Router) {
    this.summaryForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    this.cartService.getSummary().subscribe({
      next: (data) => {
        this.cartVM = data;
        // Pre-fill form if user data exists
        if (data.order) {
          this.summaryForm.patchValue(data.order);
        }
      },
      error: (err) => console.error('Error loading summary', err),
    });
  }

  placeOrder(): void {
    if (this.summaryForm.invalid) {
      return;
    }

    // Backend doesn't expect any data - it gets user info from token and cart from database
    this.cartService.placeOrder({}).subscribe({
      next: (response) => {
        // If Stripe checkout URL is present, redirect to Stripe hosted checkout page
        if (response.checkoutUrl) {
          window.location.href = response.checkoutUrl;
        }
      },
      error: (err) => console.error('Error placing order', err),
    });
  }

  getEstimatedArrival(): string {
    const start = new Date();
    start.setDate(start.getDate() + 7);
    const end = new Date();
    end.setDate(end.getDate() + 14);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  }
}
