
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material/material.module';
import { SuccessComponent } from 'src/app/shared/dialogs/success/success.component';
import { ErrorComponent } from 'src/app/shared/dialogs/error/error.component';
import { ConfirmationComponent } from 'src/app/shared/dialogs/confirmation/confirmation.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [
    SuccessComponent,
    ErrorComponent,
    ConfirmationComponent
  ]
})
export class PublicModule { }
