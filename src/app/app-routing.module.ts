import { ContracttypeModule } from './modules/contracttype/contracttype.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule)
  },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  {
    path: 'commissionmethod', component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/commissionmethod/commissionmethod.module').then(m => m.CommissionMethodModule)
  },
  {
    path: 'contractstatus', component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/contractstatus/contractstatus.module').then(m => m.ContractstatusModule)
  },
  {
    path: 'contracttype', component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/contracttype/contracttype.module').then(m => m.ContracttypeModule)
  },
  {
    path: 'partnertype', component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/partnertype/partnertype.module').then(m => m.PartnertypeModule)
  },
  {
    path: 'role', component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/role/role.module').then(m => m.RoleModule)
  },
  {
    path: 'user', component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'partner', component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/partner/partner.module').then(m => m.PartnerModule)
  },
  {
    path: 'contract', component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/contract/contract.module').then(m => m.ContractModule)
  },
  {
    path: 'sales', component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule)
  },
  {
    path: 'statement', component: AdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/statement/statement.module').then(m => m.StatementModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
