import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CompanyService } from '../../../../core/services/company.service';
import { Company } from '../../../../core/models/company.model';

@Component({
  selector: 'app-company-upsert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './company-upsert.component.html',
  styleUrls: ['./company-upsert.component.scss'],
})
export class CompanyUpsertComponent implements OnInit {
  companyForm: FormGroup;
  isEditMode = false;
  companyId: number = 0;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      streetAddress: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      phoneNumber: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.companyId = +params['id'];
        this.loadCompany(this.companyId);
      }
    });
  }

  loadCompany(id: number): void {
    this.companyService.get(id).subscribe({
      next: (company) => {
        this.companyForm.patchValue(company);
      },
      error: (err) => console.error('Error loading company', err),
    });
  }

  onSubmit(): void {
    if (this.companyForm.invalid) {
      return;
    }

    const company: Company = this.companyForm.value;

    if (this.isEditMode) {
      this.companyService.update(this.companyId, company).subscribe({
        next: () => this.router.navigate(['/admin/companies']),
        error: (err) => console.error('Error updating company', err),
      });
    } else {
      this.companyService.create(company).subscribe({
        next: () => this.router.navigate(['/admin/companies']),
        error: (err) => console.error('Error creating company', err),
      });
    }
  }
}
