import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContracttypeListComponent } from './contracttype-list/contracttype-list.component';
import { ContracttypeCreateComponent } from './contracttype-create/contracttype-create.component';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from '../public/public.module';


const routes: Routes = [
  { path: '', component: ContracttypeListComponent },
  { path: 'create', component: ContracttypeListComponent },
  { path: 'edit/:id', component: ContracttypeListComponent },
];

@NgModule({
  declarations: [
    ContracttypeListComponent,
    ContracttypeCreateComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule.forChild(routes)
  ]
})
export class ContracttypeModule { }
