import { Injectable } from '@angular/core';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToasterService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      toastClass: 'custom-toast toast-success',  // Custom class for styling
    });
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title, {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      toastClass: 'custom-toast toast-error',  // Custom class for styling
    });
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title, {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      toastClass: 'custom-toast toast-info',  // Custom class for styling
    });
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title, {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      toastClass: 'custom-toast toast-warning',  // Custom class for styling
    });
  }
}
