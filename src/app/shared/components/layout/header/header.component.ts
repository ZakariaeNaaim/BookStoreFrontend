import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  authService = inject(AuthService);
  cartService = inject(CartService);
  private router = inject(Router);
  cartItemCount = 0;
  isCollapsed = true;

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  isAdmin(): boolean {
    const user = this.authService.getCurrentUser();
    return user && (user.role === 'Admin' || user.role === 'admin');
  }

  toggleNavbar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.cartService.clearCart();
        this.router.navigate(['/customer/home']);
      },
      error: (err) => {
        console.error('Logout error:', err);
        // Still clear local state even if API call fails
        this.cartService.clearCart();
        this.router.navigate(['/customer/home']);
      },
    });
  }
}
