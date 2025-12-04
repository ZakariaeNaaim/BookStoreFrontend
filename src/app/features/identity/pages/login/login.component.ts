import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      let loginRequest!: LoginRequest;
      loginRequest.email = email!;
      loginRequest.password = password!;
      loginRequest.rememberMe = false;

      this.authService.login(loginRequest).subscribe({
        next: () => this.router.navigate(['/customer/home']),
        error: (err) => console.error('Login failed', err),
      });
    }
  }
}
