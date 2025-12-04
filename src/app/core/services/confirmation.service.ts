import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  /**
   * Display a confirmation dialog for delete operations
   */
  async confirmDelete(
    title: string = 'Are you sure?',
    text: string = "You won't be able to revert this!",
    confirmButtonText: string = 'Yes, delete it!'
  ): Promise<boolean> {
    const result: SweetAlertResult = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
    });

    return result.isConfirmed;
  }

  /**
   * Display a generic confirmation dialog
   */
  async confirm(
    title: string,
    text: string,
    confirmButtonText: string = 'Yes',
    cancelButtonText: string = 'Cancel'
  ): Promise<boolean> {
    const result: SweetAlertResult = await Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText,
      cancelButtonText,
    });

    return result.isConfirmed;
  }

  /**
   * Display a success alert
   */
  async success(title: string, text?: string): Promise<void> {
    await Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: '#3085d6',
    });
  }

  /**
   * Display an error alert
   */
  async error(title: string, text?: string): Promise<void> {
    await Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonColor: '#d33',
    });
  }

  /**
   * Display a warning alert
   */
  async warning(title: string, text?: string): Promise<void> {
    await Swal.fire({
      title,
      text,
      icon: 'warning',
      confirmButtonColor: '#ffc107',
    });
  }

  /**
   * Display an info alert
   */
  async info(title: string, text?: string): Promise<void> {
    await Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonColor: '#17a2b8',
    });
  }
}
