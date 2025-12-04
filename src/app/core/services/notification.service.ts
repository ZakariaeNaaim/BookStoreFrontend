import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {
    this.checkSessionStorageNotifications();
  }

  /**
   * Display a success notification
   */
  success(message: string, title?: string): void {
    this.toastr.success(message, title);
  }

  /**
   * Display an error notification
   */
  error(message: string, title?: string): void {
    this.toastr.error(message, title);
  }

  /**
   * Display a warning notification
   */
  warning(message: string, title?: string): void {
    this.toastr.warning(message, title);
  }

  /**
   * Display an info notification
   */
  info(message: string, title?: string): void {
    this.toastr.info(message, title);
  }

  /**
   * Store a success message in sessionStorage to display after navigation
   */
  setSuccessMessage(message: string): void {
    sessionStorage.setItem('toastr-success-message', message);
  }

  /**
   * Store an error message in sessionStorage to display after navigation
   */
  setErrorMessage(message: string): void {
    sessionStorage.setItem('toastr-error-message', message);
  }

  /**
   * Store a warning message in sessionStorage to display after navigation
   */
  setWarningMessage(message: string): void {
    sessionStorage.setItem('toastr-warning-message', message);
  }

  /**
   * Store an info message in sessionStorage to display after navigation
   */
  setInfoMessage(message: string): void {
    sessionStorage.setItem('toastr-info-message', message);
  }

  /**
   * Check sessionStorage for pending notifications and display them
   * This should be called on component initialization
   */
  private checkSessionStorageNotifications(): void {
    // Check for success message
    const successMessage = sessionStorage.getItem('toastr-success-message');
    if (successMessage) {
      this.success(successMessage);
      sessionStorage.removeItem('toastr-success-message');
    }

    // Check for error message
    const errorMessage = sessionStorage.getItem('toastr-error-message');
    if (errorMessage) {
      this.error(errorMessage);
      sessionStorage.removeItem('toastr-error-message');
    }

    // Check for warning message
    const warningMessage = sessionStorage.getItem('toastr-warning-message');
    if (warningMessage) {
      this.warning(warningMessage);
      sessionStorage.removeItem('toastr-warning-message');
    }

    // Check for info message
    const infoMessage = sessionStorage.getItem('toastr-info-message');
    if (infoMessage) {
      this.info(infoMessage);
      sessionStorage.removeItem('toastr-info-message');
    }
  }
}
