import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'company', 'role', 'actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error loading users', err);
        this.notificationService.error('Failed to load users');
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async lockUnlock(user: User): Promise<void> {
    this.userService.lockUnlock(user.id).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.notificationService.success(response.message);
          this.loadUsers(); // Reload to update button state
        } else {
          this.notificationService.error(response.message);
        }
      },
      error: (err) => {
        const message = err.error?.message || 'An error occurred while updating user status.';
        this.notificationService.error(message);
      },
    });
  }

  getLockButtonClass(isLocked: boolean): string {
    return isLocked ? 'btn-danger' : 'btn-success';
  }

  getLockButtonText(isLocked: boolean): string {
    return isLocked ? 'Unlock' : 'Lock';
  }

  getLockIcon(isLocked: boolean): string {
    return isLocked ? 'lock_open' : 'lock';
  }
}
