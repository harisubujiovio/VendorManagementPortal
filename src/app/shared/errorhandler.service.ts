import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorComponent } from './dialogs/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {
  public errorMessage: string = '';
  public dialogConfig: any;
  constructor(private router: Router, private dialog: MatDialog) {

  }
  public handleError = (error: HttpErrorResponse) => {
    if (error.status === 500) {
      this.handle500Error(error);
    }
    else if (error.status === 404) {
      this.handle404Error(error)
    }
    else {
      this.handleOtherError(error);
    }
  }
  private handle500Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }

  private handle404Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }

  private handleOtherError = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.dialogConfig.data = { 'errorMessage': this.errorMessage };
    this.dialog.open(ErrorComponent, this.dialogConfig);
  }

  public handleExtensionError = (message: any) => {
    this.dialogConfig.data = { 'errorMessage': message };
    this.dialog.open(ErrorComponent, this.dialogConfig);
  }


  private createErrorMessage(response: HttpErrorResponse) {
    console.log(response);
    console.log(response.error);
    if (response.status === 0 && response.error instanceof ProgressEvent) {
      this.errorMessage = 'A client-side or network error occurred.';
    }
    else if (response.status === 400 && response.error.mobileNumber) {
      this.errorMessage = response.error.mobileNumber;
    }
    else if (response.status === 400 && response.error.username) {
      this.errorMessage = response.error.username;
    }
    else if (response.status === 400 && response.error.name instanceof Array) {
      this.errorMessage = response.error.name[0];
    }
    else {
      this.errorMessage = response.error ? response.error : response.statusText;
    }

  }
}
