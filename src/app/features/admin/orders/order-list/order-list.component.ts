import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';
import { OrderHeader } from '../../../../core/models/order.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: OrderHeader[] = [];
  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'email', 'status', 'total', 'actions'];
  status: string = 'all';

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.status = params['status'] || 'all';
      this.loadOrders();
    });
  }

  loadOrders(): void {
    this.orderService.getAll(this.status).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Error loading orders', err);
      },
    });
  }
}
