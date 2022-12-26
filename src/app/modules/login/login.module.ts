import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PublicModule } from '../public/public.module';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
