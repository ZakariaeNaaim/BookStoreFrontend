import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: () => {
        this.successMessage = 'Password reset link has been sent to your email.';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to send reset link. Please try again.';
        this.successMessage = '';
        // console.error('Forgot password error', err);
      },
    });
  }
}
