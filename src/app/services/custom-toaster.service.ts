import { inject, Injectable } from '@angular/core';
import { ToastrService, ActiveToast } from 'ngx-toastr'; // Import ActiveToast type

@Injectable({
  providedIn: 'root'
})
export class CustomToasterService {
  private toastr = inject(ToastrService);

  showSuccess(message: string, title: string) {
    const toast = this.toastr.success(message, title, {
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      toastClass: 'custom-toast toast-success',
      tapToDismiss: false,
    });
    this.addCloseOnClick(toast);
  }

  showError(message: string, title: string) {
    const toast = this.toastr.error(message, title, {
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      toastClass: 'custom-toast toast-error',
      tapToDismiss: false,
    });

    this.addCloseOnClick(toast);
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

    this.addCloseOnClick(toast);
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

    this.addCloseOnClick(toast);
  }

  private addCloseOnClick(toast: ActiveToast<any>) {
    debugger;
    toast.onTap.subscribe(() => this.toastr.clear(toast.toastId));
  }
}
