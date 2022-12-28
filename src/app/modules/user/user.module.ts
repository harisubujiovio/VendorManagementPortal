import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { PublicModule } from '../public/public.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'create', component: UserCreateComponent },
  { path: 'edit/:id', component: UserCreateComponent },
];

@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
