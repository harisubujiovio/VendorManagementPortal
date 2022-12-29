import { IPartnerRoot } from './../models/IPartnerRoot';
import { IDictionary } from './../models/IDictionary';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { handleError } from '../utils/errorhandler';
import { IPartner } from '../models/IPartner';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http: HttpClient) { }
  getList(filterKey: string, sortField: string, sortOrder: string, filterValue: string, pageNumber: number, pageSize: number): Observable<IPartnerRoot> {
    let params = new HttpParams()
      .set('pageNo', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortCol', sortField)
      .set('sortType', sortOrder)
      .set('filterKey', filterKey);
    console.log(`${environment.apiUrl}/Partner/GetAll/?${params.toString()}`)
    return this.http.get<IPartnerRoot>(`${environment.apiUrl}/Partner/GetAll/?${params.toString()}`).pipe(
      catchError(handleError<IPartnerRoot>('getPartners'))
    );
  }
  getById(id: string): Observable<IPartner> {
    return this.http.get<IPartner>(`${environment.apiUrl}/Partner/${id}`).pipe(
      tap(response => {
        console.log(response)
      })
    );
  }
  getDictionary(): Observable<IDictionary[]> {
    console.log(`${environment.apiUrl}/Partner/GetDictionary`)
    return this.http.get<IDictionary[]>(`${environment.apiUrl}/Partner/GetDictionary`).pipe(
      catchError(handleError<IDictionary[]>('getPartnersDictionary'))
    );
  }
  createPartner(partner: IPartner): Observable<IPartner> {
    return this.http.post<IPartner>(`${environment.apiUrl}/Partner`, partner);
  }
  updatePartner(id: string, role: IPartner): Observable<IPartner> {
    return this.http.put<IPartner>(`${environment.apiUrl}/Partner/${id}`, role);
  }
  deletePartner(id: string) {
    console.log(`${environment.apiUrl}/Partner/${id}`)
    return this.http.delete<IPartner>(`${environment.apiUrl}/Partner/${id}`);
  }
}
