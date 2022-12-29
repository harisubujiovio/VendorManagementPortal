import { PublicModule } from './../public/public.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementListComponent } from './statement-list/statement-list.component';
import { StatementCreateComponent } from './statement-create/statement-create.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: StatementListComponent },
  { path: 'create', component: StatementCreateComponent },
  { path: 'edit/:id', component: StatementCreateComponent },
];

@NgModule({
  declarations: [
    StatementListComponent,
    StatementCreateComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule.forChild(routes)
  ]
})
export class StatementModule { }
