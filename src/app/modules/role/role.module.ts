import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { PublicModule } from '../public/public.module';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: RoleListComponent },
  { path: 'create', component: RoleCreateComponent },
  { path: 'edit/:id', component: RoleCreateComponent },
];

@NgModule({
  declarations: [
    RoleListComponent,
    RoleCreateComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule.forChild(routes)
  ]
})
export class RoleModule { }
