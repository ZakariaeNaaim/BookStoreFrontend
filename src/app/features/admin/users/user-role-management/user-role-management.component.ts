import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { RoleManagementVM, User } from '../../../../core/models/user.model';
import { Company } from '../../../../core/models/company.model';

@Component({
  selector: 'app-user-role-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-role-management.component.html',
  styleUrls: ['./user-role-management.component.scss'],
})
export class UserRoleManagementComponent implements OnInit {
  roleForm: FormGroup;
  userId: string = '';
  roles: string[] = [];
  companies: Company[] = [];
  user: User | null = null;
  showCompany: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.roleForm = this.fb.group({
      role: ['', Validators.required],
      companyId: [''],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    if (this.userId) {
      this.loadRoleManagement();
    }

    this.roleForm.get('role')?.valueChanges.subscribe((role) => {
      this.showCompany = role === 'Company';
      const companyControl = this.roleForm.get('companyId');
      if (this.showCompany) {
        companyControl?.setValidators([Validators.required]);
      } else {
        companyControl?.clearValidators();
      }
      companyControl?.updateValueAndValidity();
    });
  }

  loadRoleManagement(): void {
    this.userService.getRoleManagement(this.userId).subscribe({
      next: (data: RoleManagementVM) => {
        // Backend returns flat structure
        this.user = {
          id: data.id.toString(),
          name: data.name,
          role: data.role,
          companyId: data.companyId,
          email: '', // Not provided by backend
          phoneNumber: '', // Not provided by backend
          isLocked: false, // Not provided by backend
        };
        this.roles = data.roles.map((r) => r.value); // Extract values from RoleDto
        this.companies = data.companies;
        this.roleForm.patchValue({
          role: data.role,
          companyId: data.companyId,
        });
      },
      error: (err) => console.error('Error loading role management', err),
    });
  }

  onSubmit(): void {
    if (this.roleForm.invalid) {
      return;
    }

    const { role, companyId } = this.roleForm.value;
    this.userService.updateRole({ id: Number(this.userId), role, companyId }).subscribe({
      next: () => this.router.navigate(['/admin/users']),
      error: (err) => console.error('Error updating role', err),
    });
  }
}
