import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CompanyService } from '../../../../core/services/company.service';
import { Company } from '../../../../core/models/company.model';

@Component({
  selector: 'app-company-delete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-delete.component.html',
  styleUrls: ['./company-delete.component.scss'],
})
export class CompanyDeleteComponent implements OnInit {
  company: Company | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.companyService.get(+id).subscribe({
        next: (data) => (this.company = data),
        error: (err) => console.error('Error loading company for delete', err),
      });
    }
  }

  onDelete(): void {
    if (this.company) {
      this.companyService.delete(this.company.id).subscribe({
        next: () => this.router.navigate(['/admin/companies']),
        error: (err) => console.error('Error deleting company', err),
      });
    }
  }
}
