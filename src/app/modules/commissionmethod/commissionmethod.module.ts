
import { CommissionmethodCreateComponent } from './commissionmethod-create/commissionmethod-create.component';
import { CommissionmethodListComponent } from './commissionmethod-list/commissionmethod-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from '../public/public.module';
const routes: Routes = [
    { path: '', component: CommissionmethodListComponent },
    { path: 'create', component: CommissionmethodCreateComponent },
    { path: 'edit/:id', component: CommissionmethodCreateComponent },
];
@NgModule({
    declarations: [
        CommissionmethodListComponent,
        CommissionmethodCreateComponent
    ],
    imports: [
        CommonModule,
        PublicModule,
        RouterModule.forChild(routes)
    ]
})
export class CommissionMethodModule { }