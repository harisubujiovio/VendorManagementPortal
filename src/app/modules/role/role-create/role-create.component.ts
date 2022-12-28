import { IRole } from './../../../models/IRole';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RoleService } from 'src/app/services/role.service';
import { ErrorhandlerService } from 'src/app/shared/errorhandler.service';
import { SuccessComponent } from 'src/app/shared/dialogs/success/success.component';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  loading = false;
  submitted = false;
  id: string;
  isAddMode: boolean;
  private dialogConfig: any;
  roleForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required]

  });
  constructor(private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private roleService: RoleService,
    private authService: AuthenticationService,
    private route: ActivatedRoute, private dialog: MatDialog,
    private errorService: ErrorhandlerService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }

    if (!this.isAddMode) {
      this.roleService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.roleForm.patchValue(x));
    }

  }
  public onCancel = () => {
    this.location.back();
  }
  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.roleForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createRole();
    } else {
      this.updateRole();
    }
  }
  private createRole() {
    let newrole: IRole = {
      name: this.roleForm.get("name")?.value,
      description: this.roleForm.get("description")?.value
    }
    this.roleService.createRole(newrole)
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
  private updateRole() {
    let updatedrole: IRole = {
      name: this.roleForm.get("name")?.value,
      description: this.roleForm.get("description")?.value
    }
    this.roleService.updateRole(this.id, updatedrole)
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
