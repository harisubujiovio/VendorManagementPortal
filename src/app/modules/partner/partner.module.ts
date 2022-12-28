import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerCreateComponent } from './partner-create/partner-create.component';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from '../public/public.module';

const routes: Routes = [
  { path: '', component: PartnerListComponent },
  { path: 'create', component: PartnerCreateComponent },
  { path: 'edit/:id', component: PartnerCreateComponent },
];

@NgModule({
  declarations: [
    PartnerListComponent,
    PartnerCreateComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule.forChild(routes)
  ]
})
export class PartnerModule { }
