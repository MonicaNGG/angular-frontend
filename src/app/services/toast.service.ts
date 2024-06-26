import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private toastr: ToastrService ){}


  showSuccess(message: string, title: string): void {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string): void {
    this.toastr.error(message, title);
  }

  showWarning(message: string, title: string): void {
    this.toastr.warning(message, title, { timeOut: 5000});
  }

  waiting( message: string, title: string ): void{
    this.toastr.info(message, title, { timeOut: 5000, progressBar: true});
  }
}
