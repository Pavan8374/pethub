import { Injectable } from '@angular/core';
import { ToastrService, ActiveToast } from 'ngx-toastr'; // Import ActiveToast type

@Injectable({
  providedIn: 'root'
})
export class CustomToasterService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string) {
    const toast = this.toastr.success(message, title, {
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      toastClass: 'custom-toast toast-success',
      tapToDismiss: false
    });

    this.addClickHandler(toast);
  }

  showError(message: string, title: string) {
    const toast = this.toastr.error(message, title, {
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      toastClass: 'custom-toast toast-error',
      tapToDismiss: false
    });

    this.addClickHandler(toast);
  }

  showInfo(message: string, title: string) {
    const toast = this.toastr.info(message, title, {
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      toastClass: 'custom-toast toast-info',
      tapToDismiss: false
    });

    this.addClickHandler(toast);
  }

  showWarning(message: string, title: string) {
    const toast = this.toastr.warning(message, title, {
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      toastClass: 'custom-toast toast-warning',
      tapToDismiss: false
    });

    this.addClickHandler(toast);
  }

  private addClickHandler(toast: ActiveToast<any>) { // Use ActiveToast type here
    toast.onTap.subscribe(() => {
      this.clearAllNotifications();
    });
  }

  clearAllNotifications() {
    this.toastr.clear(); // Clears all toasts
  }
}
