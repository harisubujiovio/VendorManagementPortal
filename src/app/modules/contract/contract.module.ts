import { PublicModule } from './../public/public.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractCreateComponent } from './contract-create/contract-create.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ContractListComponent },
  { path: 'create', component: ContractCreateComponent },
  { path: 'edit/:id', component: ContractCreateComponent },
];

@NgModule({
  declarations: [
    ContractListComponent,
    ContractCreateComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule.forChild(routes)
  ]
})
export class ContractModule { }
