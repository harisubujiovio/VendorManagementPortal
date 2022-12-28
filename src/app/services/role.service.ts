import { IDictionary } from './../models/IDictionary';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRole } from '../models/IRole';
import { handleError } from '../utils/errorhandler';
import { IRoleRoot } from '../models/IRoleRoot';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getList(sortField: string, sortOrder: string, filterValue: string, pageNumber: number, pageSize: number): Observable<IRoleRoot> {
    let params = new HttpParams()
      .set('pageNo', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortCol', sortField)
      .set('sortType', sortOrder);
    console.log(`${environment.apiUrl}/Role/GetAll/?${params.toString()}`)
    return this.http.get<IRoleRoot>(`${environment.apiUrl}/Role/GetAll/?${params.toString()}`).pipe(
      catchError(handleError<IRoleRoot>('getRoles'))
    );
  }
  getById(id: string): Observable<IRole> {
    return this.http.get<IRole>(`${environment.apiUrl}/Role/${id}`).pipe(
      tap(response => {
        console.log(response)
      })
    );
  }
  getDictionary(): Observable<IDictionary[]> {
    console.log(`${environment.apiUrl}/Role/GetDictionary`)
    return this.http.get<IDictionary[]>(`${environment.apiUrl}/Role/GetDictionary`).pipe(
      catchError(handleError<IDictionary[]>('getRolesDictionary'))
    );
  }
  createRole(role: IRole): Observable<IRole> {
    return this.http.post<IRole>(`${environment.apiUrl}/Role`, role);
  }
  updateRole(id: string, role: IRole): Observable<IRole> {
    return this.http.put<IRole>(`${environment.apiUrl}/Role/${id}`, role);
  }
  deleteRole(id: string) {
    console.log(`${environment.apiUrl}/Role/${id}`)
    return this.http.delete<IRole>(`${environment.apiUrl}/Role/${id}`);
  }
}
