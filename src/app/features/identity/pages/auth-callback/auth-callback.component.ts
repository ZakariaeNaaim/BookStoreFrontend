import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="callback-container">
      <mat-spinner></mat-spinner>
      <p>Processing authentication...</p>
    </div>
  `,
  styles: [
    `
      .callback-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        gap: 20px;
      }
    `,
  ],
})
export class AuthCallbackComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // Extract token and user from query parameters
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const userJson = params['user'];

      if (token) {
        // Store token in localStorage
        localStorage.setItem('token', token);

        // Store user data if provided (from external login)
        if (userJson) {
          try {
            const user = JSON.parse(decodeURIComponent(userJson));
            localStorage.setItem('currentUser', JSON.stringify(user));
          } catch (e) {
            console.error('Failed to parse user data', e);
          }
        }

        // Navigate to home or return URL
        const returnUrl = params['returnUrl'] || '/customer/home';
        this.router.navigate([returnUrl]);
      } else {
        // No token found, redirect to login with error
        this.router.navigate(['/identity/login'], {
          queryParams: { error: 'Authentication failed' },
        });
      }
    });
  }
}
