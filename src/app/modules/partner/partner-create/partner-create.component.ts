import { IPartner } from './../../../models/IPartner';
import { PartnertypeService } from 'src/app/services/partnertype.service';
import { PartnerService } from './../../../services/partner.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorhandlerService } from 'src/app/shared/errorhandler.service';
import { SuccessComponent } from 'src/app/shared/dialogs/success/success.component';
import { IDictionary } from 'src/app/models/IDictionary';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.css']
})
export class PartnerCreateComponent implements OnInit {
  loading = false;
  submitted = false;
  id: string;
  isAddMode: boolean;
  formTitle: string;
  private dialogConfig: any;
  users: IDictionary[];

  partnerTypes: IDictionary[];
  partnerForm: FormGroup;

  email: any;

  mobileNumber: any;
  constructor(private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private partnerService: PartnerService,

    private partnerTypeService: PartnertypeService,
    private userService: UserService,
    private authService: AuthenticationService,
    private route: ActivatedRoute, private dialog: MatDialog,
    private errorService: ErrorhandlerService) {
    this.userService.getDictionary()
      .subscribe(users => {
        this.users = users;
      });
    this.partnerTypeService.getDictionary()
      .subscribe(partnerTypes => {
        this.partnerTypes = partnerTypes;
      });
  }
  onuserchange(value: string) {
    console.log(value);
    this.userService.getById(value)
      .subscribe(user => {
        this.email = user.email;
        this.mobileNumber = user.mobileNumber;
      });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.isAddMode = this.id ? false : true;

    this.partnerForm = this.fb.group({
      partnerNo: [null, Validators.required],
      partnerName: [null, Validators.required],
      email: [null, Validators.required],
      mobileNumber: [null, [Validators.required, Validators.minLength(8)]],
      partnerTypeId: [null, Validators.required],
      userid: [null]
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }
    if (!this.isAddMode) {
      this.partnerService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.partnerForm.patchValue(x);
          console.log(this.partnerForm);
        });
    }
  }
  public onCancel = () => {
    this.location.back();
  }
  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.partnerForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createPartner();
    } else {
      this.updatePartner();
    }
  }
  private createPartner() {
    let newPartner: IPartner = {
      partnerNo: this.partnerForm.get("partnerNo")?.value,
      partnerName: this.partnerForm.get("partnerName")?.value,
      email: this.partnerForm.get("email")?.value,
      mobileNumber: this.partnerForm.get("mobileNumber")?.value,
      partnerTypeId: this.partnerForm.get("partnerTypeId")?.value
    }
    this.partnerService.createPartner(newPartner)
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
  private updatePartner() {
    let updatePartner: IPartner = {
      partnerNo: this.partnerForm.get("partnerNo")?.value,
      partnerName: this.partnerForm.get("partnerName")?.value,
      email: this.partnerForm.get("email")?.value,
      mobileNumber: this.partnerForm.get("mobileNumber")?.value,
      partnerTypeId: this.partnerForm.get("partnerTypeId")?.value
    }
    this.partnerService.updatePartner(this.id, updatePartner)
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
