import { IUserRegister } from './../models/IUserRegister';
import { IDictionary } from './../models/IDictionary';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { handleError } from '../utils/errorhandler';
import { IUserRoot } from '../models/IUserRoot';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getList(sortField: string, sortOrder: string, filterValue: string, pageNumber: number, pageSize: number): Observable<IUserRoot> {
    let params = new HttpParams()
      .set('pageNo', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortCol', sortField)
      .set('sortType', sortOrder);
    console.log(`${environment.apiUrl}/User/GetAll/?${params.toString()}`)
    return this.http.get<IUserRoot>(`${environment.apiUrl}/User/GetAll/?${params.toString()}`).pipe(
      catchError(handleError<IUserRoot>('getUsers'))
    );
  }
  getById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/User/${id}`).pipe(
      tap(response => {
        console.log(response)
      })
    );
  }
  getDictionary(): Observable<IDictionary[]> {
    console.log(`${environment.apiUrl}/User/GetDictionary`)
    return this.http.get<IDictionary[]>(`${environment.apiUrl}/User/GetDictionary`).pipe(
      catchError(handleError<IDictionary[]>('getUsersDictionary'))
    );
  }
  createUser(user: IUserRegister): Observable<IUser> {
    console.log(user);
    return this.http.post<IUserRegister>(`${environment.apiUrl}/Authentication/Register`, user);
  }
  updateUser(id: string, role: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${environment.apiUrl}/User/${id}`, role);
  }
  deleteUser(id: string) {
    console.log(`${environment.apiUrl}/User/${id}`)
    return this.http.delete<IUser>(`${environment.apiUrl}/User/${id}`);
  }

}
