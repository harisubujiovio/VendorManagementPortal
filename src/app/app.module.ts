import { AdminComponent } from './modules/admin/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicModule } from './modules/public/public.module'
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ConfirmationComponent } from './shared/dialogs/confirmation/confirmation.component';
import { ErrorComponent } from './shared/dialogs/error/error.component';
import { SuccessComponent } from './shared/dialogs/success/success.component';
import { MatIconModule } from '@angular/material/icon';
export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    ConfirmationComponent,
    ErrorComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PublicModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7194"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
