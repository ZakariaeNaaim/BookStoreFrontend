import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../../core/services/order.service';
import { OrderVM } from '../../../../core/models/order.model';
import { AuthService } from '../../../../core/services/auth.service'; // Assuming this exists for role checks

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  orderVM: OrderVM | null = null;
  orderForm: FormGroup;
  isAdminOrEmployee: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      carrier: [''],
      trackingNumber: [''],
    });
  }

  ngOnInit(): void {
    // Check roles - placeholder logic, adjust based on actual AuthService
    // this.isAdminOrEmployee = this.authService.isInRole('Admin') || this.authService.isInRole('Employee');
    this.isAdminOrEmployee = true; // For dev

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOrder(+id);
    }
  }

  loadOrder(id: number): void {
    this.orderService.get(id).subscribe({
      next: (data) => {
        this.orderVM = data;
        this.orderForm.patchValue(data.orderHeader);
      },
      error: (err) => console.error('Error loading order', err),
    });
  }

  updateOrderDetails(): void {
    if (this.orderForm.valid && this.orderVM) {
      const updatedOrder = {
        ...this.orderVM,
        orderHeader: { ...this.orderVM.orderHeader, ...this.orderForm.value },
      };
      this.orderService.updateOrderDetails(updatedOrder).subscribe({
        next: () => {
          // Show success message
          this.loadOrder(this.orderVM!.orderHeader.id);
        },
        error: (err) => console.error('Error updating order', err),
      });
    }
  }

  startProcessing(): void {
    if (this.orderVM) {
      this.orderService.startProcessing(this.orderVM.orderHeader.id).subscribe({
        next: () => this.loadOrder(this.orderVM!.orderHeader.id),
        error: (err) => console.error('Error starting processing', err),
      });
    }
  }

  shipOrder(): void {
    if (this.orderVM) {
      // Validate carrier and tracking number
      const carrier = this.orderForm.get('carrier')?.value;
      const trackingNumber = this.orderForm.get('trackingNumber')?.value;

      if (!carrier || !trackingNumber) {
        alert('Please enter carrier and tracking number');
        return;
      }

      const updatedOrder = {
        ...this.orderVM,
        orderHeader: { ...this.orderVM.orderHeader, ...this.orderForm.value },
      };
      this.orderService.shipOrder(updatedOrder).subscribe({
        next: () => this.loadOrder(this.orderVM!.orderHeader.id),
        error: (err) => console.error('Error shipping order', err),
      });
    }
  }

  cancelOrder(): void {
    if (this.orderVM) {
      this.orderService.cancelOrder(this.orderVM.orderHeader.id).subscribe({
        next: () => this.loadOrder(this.orderVM!.orderHeader.id),
        error: (err) => console.error('Error canceling order', err),
      });
    }
  }
}
