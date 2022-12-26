import { IAuthenticationResponse } from './../../../models/IAuthenticationResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserSession } from 'src/app/models/IUserSession';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError = '';
  invalidLogin: boolean;
  loginForm: FormGroup;
  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  constructor(private router: Router, private fb: FormBuilder,
    private authService: AuthenticationService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  get f() { return this.loginForm.value; }
  authenticate() {
    if (this.loginForm.valid) {
      this.authService.login(this.f.username, this.f.password)
        .subscribe({
          next: (response: IAuthenticationResponse) => {
            const token = response.token;
            localStorage.setItem("jwt", token);
            var session = this.jwtHelper.decodeToken<IUserSession>(response.token)
            this.invalidLogin = false;
            this.router.navigate(["/admin/dashboard"]);
          },
          error: (err: HttpErrorResponse) => {
            this.invalidLogin = true
          }
        })
    }
  }
}
