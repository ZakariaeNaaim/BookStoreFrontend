import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    // If backend redirected here after external login
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        // optionally call backend to get user info
        this.router.navigate(['/']);
      }
      if (params['error']) {
        this.errorMessage = 'External login failed: ' + params['error'];
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
        console.error('Login error', err);
      },
    });
  }

  loginWithFacebook(): void {
    this.authService.externalLogin('Facebook');
  }

  loginWithMicrosoft(): void {
    this.authService.externalLogin('Microsoft');
  }
}
