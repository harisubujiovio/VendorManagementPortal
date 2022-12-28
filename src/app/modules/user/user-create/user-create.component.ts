import { RoleService } from 'src/app/services/role.service';
import { IDictionary } from './../../../models/IDictionary';
import { IUserRegister } from './../../../models/IUserRegister';
import { IUser } from 'src/app/models/IUser';
import { UserService } from './../../../services/user.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorhandlerService } from 'src/app/shared/errorhandler.service';
import { SuccessComponent } from 'src/app/shared/dialogs/success/success.component';
import { MustMatch } from 'src/app/utils/must-match.validator';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  loading = false;
  submitted = false;
  id: string;
  isAddMode: boolean;
  formTitle: string;
  private dialogConfig: any;
  roles: IDictionary[];
  userForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private roleService: RoleService,
    private userService: UserService,
    private authService: AuthenticationService,
    private route: ActivatedRoute, private dialog: MatDialog,
    private errorService: ErrorhandlerService) {
    this.roleService.getDictionary()
      .subscribe(roles => {
        this.roles = roles;
      })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.isAddMode = this.id ? false : true;

    this.userForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator]],
      confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
      email: [null, Validators.required],
      mobileNumber: [null, [Validators.required, Validators.minLength(8)]],
      address: [null],
      roleid: [null, Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }

    if (!this.isAddMode) {
      this.userService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.userForm.patchValue(x);
          console.log(this.userForm);
        });
    }

  }
  public onCancel = () => {
    this.location.back();
  }
  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }
  private createUser() {
    let newuser: IUserRegister = {
      firstName: this.userForm.get("firstName")?.value,
      lastName: this.userForm.get("lastName")?.value,
      password: this.userForm.get("password")?.value,
      email: this.userForm.get("email")?.value,
      mobileNumber: this.userForm.get("mobileNumber")?.value,
      address: this.userForm.get("address")?.value,
      roleid: this.userForm.get("roleid")?.value
    }
    this.userService.createUser(newuser)
      .pipe(first())
      .subscribe({
        next: () => {
          //this.alertService.success('User added', { keepAfterRouteChange: true });
          let dialogRef = this.dialog.open(SuccessComponent, this.dialogConfig);

          //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
          dialogRef.afterClosed()
            .subscribe(result => {
              this.location.back();
            });

        },
        error: error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
          this.loading = false;
        }
      });
  }
  private updateUser() {
    let updateuser: IUser = {
      firstName: this.userForm.get("firstName")?.value,
      lastName: this.userForm.get("lastName")?.value,
      email: this.userForm.get("email")?.value,
      mobileNumber: this.userForm.get("mobileNumber")?.value,
      address: this.userForm.get("address")?.value,
      roleid: this.userForm.get("roleid")?.value
    }
    this.userService.updateUser(this.id, updateuser)
      .pipe(first())
      .subscribe({
        next: () => {
          let dialogRef = this.dialog.open(SuccessComponent, this.dialogConfig);

          //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
          dialogRef.afterClosed()
            .subscribe(result => {
              this.location.back();
            });
        },
        error: error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
          this.loading = false;
        }
      });
  }

}
