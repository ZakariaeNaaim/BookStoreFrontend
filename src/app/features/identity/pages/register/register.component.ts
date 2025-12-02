import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { RegisterRequest } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      let registerRequest!: RegisterRequest;
      registerRequest.fullName = firstName!;
      registerRequest.email = email!;
      registerRequest.password = password!;
      registerRequest.phoneNumber = '';
      registerRequest.streetAddress = '';
      registerRequest.city = '';
      registerRequest.state = '';
      registerRequest.postalCode = '';
      this.authService.register(registerRequest).subscribe({
        next: () => this.router.navigate(['/identity/login']),
        error: (err) => console.error('Register failed', err),
      });
    }
  }
}
