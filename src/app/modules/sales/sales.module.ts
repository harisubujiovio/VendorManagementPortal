import { PublicModule } from './../public/public.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesCreateComponent } from './sales-create/sales-create.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: SalesListComponent },
  { path: 'create', component: SalesCreateComponent },
  { path: 'edit/:id', component: SalesCreateComponent },
];
@NgModule({
  declarations: [
    SalesListComponent,
    SalesCreateComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesModule { }
