import { IUserSession } from './../models/IUserSession';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthenticationResponse } from '../models/IAuthenticationResponse';
import { handleError } from '../utils/errorhandler';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpClient) {

  }
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }
  login(username: any, password: any): Observable<IAuthenticationResponse> {
    console.log(`${environment.apiUrl}/Authentication/Login`)
    return this.http.post<IAuthenticationResponse>(`${environment.apiUrl}/Authentication/Login`, { username, password })
      .pipe(tap(response => {
        console.log(response)

      }),
        catchError(handleError<any>('login', null))
      );
  }
  public get loggedInUser(): IUserSession | null {
    var token = localStorage.getItem("jwt");
    if (token) {
      var session = this.jwtHelper.decodeToken<IUserSession>(token)
      console.log(session);
      return (session != null) ? session : null;
    }
    return null;
  }
  signOut() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }
}
