import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Company } from '../../../core/models/company.model';
import { AuthService } from '../../../core/services/auth.service';
import { CompanyService } from '../../../core/services/company.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  roles: string[] = ['Customer', 'Company', 'Admin', 'Employee'];
  companies: Company[] = [];
  showCompany: boolean = false;
  isAdminRegistration: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private companyService: CompanyService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      role: ['Customer'],
      companyId: [null],
    });
  }

  ngOnInit(): void {
    // Check if admin is registering a user
    this.isAdminRegistration = this.authService.isInRole('Admin');

    if (this.isAdminRegistration) {
      this.loadCompanies();
      this.registerForm.get('role')?.valueChanges.subscribe((role) => {
        this.showCompany = role === 'Company';
        const companyControl = this.registerForm.get('companyId');
        if (this.showCompany) {
          companyControl?.setValidators([Validators.required]);
        } else {
          companyControl?.clearValidators();
        }
        companyControl?.updateValueAndValidity();
      });
    }
  }

  loadCompanies(): void {
    this.companyService.getAll().subscribe({
      next: (data) => {
        this.companies = data;
      },
      error: (err) => console.error('Error loading companies', err),
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        if (this.isAdminRegistration) {
          this.router.navigate(['/admin/users']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error', err);
      },
    });
  }
}
