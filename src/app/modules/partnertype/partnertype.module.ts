import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnertypeListComponent } from './partnertype-list/partnertype-list.component';
import { PartnertypeCreateComponent } from './partnertype-create/partnertype-create.component';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from '../public/public.module';

const routes: Routes = [
  { path: '', component: PartnertypeListComponent },
  { path: 'create', component: PartnertypeCreateComponent },
  { path: 'edit/:id', component: PartnertypeCreateComponent },
];

@NgModule({
  declarations: [
    PartnertypeListComponent,
    PartnertypeCreateComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule.forChild(routes)
  ]
})
export class PartnertypeModule { }
