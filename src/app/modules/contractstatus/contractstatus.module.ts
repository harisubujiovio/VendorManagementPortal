import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractstatusListComponent } from './contractstatus-list/contractstatus-list.component';
import { ContractstatusCreateComponent } from './contractstatus-create/contractstatus-create.component';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from '../public/public.module';

const routes: Routes = [
  { path: '', component: ContractstatusListComponent },
  { path: 'create', component: ContractstatusCreateComponent },
  { path: 'edit/:id', component: ContractstatusCreateComponent },
];

@NgModule({
  declarations: [
    ContractstatusListComponent,
    ContractstatusCreateComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule.forChild(routes)
  ]
})
export class ContractstatusModule { }
