import { IDictionary } from './../models/IDictionary';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { handleError } from '../utils/errorhandler';
import { IStatementRoot } from '../models/IStatementRoot';
import { IStatement } from '../models/IStatement';


@Injectable({
  providedIn: 'root'
})
export class StatementService {

  constructor(private http: HttpClient) { }

  getList(sortField: string, sortOrder: string, filterValue: string, pageNumber: number, pageSize: number,
    partnerId?: string): Observable<IStatementRoot> {
    let paramsMap = new Map<any, any>();
    paramsMap.set('pageNo', pageNumber.toString());
    paramsMap.set('pageSize', pageSize.toString());
    paramsMap.set('sortCol', sortField);
    paramsMap.set('sortType', sortOrder);
    paramsMap.set('filterKey', filterValue);
    if (partnerId) {
      paramsMap.set('partnerId', partnerId);
    }
    let params = new HttpParams();
    paramsMap.forEach((value: any, key: any) => {
      params = params.set(key, value);
    });
    console.log(`${environment.apiUrl}/Statement/GetAll/?${params.toString()}`)
    return this.http.get<IStatementRoot>(`${environment.apiUrl}/Statement/GetAll/?${params.toString()}`).pipe(
      catchError(handleError<IStatementRoot>('getStatements'))
    );
  }
  getById(id: string): Observable<IStatement> {
    return this.http.get<IStatement>(`${environment.apiUrl}/Statement/${id}`).pipe(
      tap(response => {
        console.log(response)
      })
    );
  }
  getDictionary(): Observable<IDictionary[]> {
    console.log(`${environment.apiUrl}/Statement/GetDictionary`)
    return this.http.get<IDictionary[]>(`${environment.apiUrl}/Statement/GetDictionary`).pipe(
      catchError(handleError<IDictionary[]>('getStatementsDictionary'))
    );
  }
  createStatement(statement: IStatement): Observable<IStatement> {
    return this.http.post<IStatement>(`${environment.apiUrl}/Statement`, statement);
  }
  updateStatement(id: string, statement: IStatement): Observable<IStatement> {
    return this.http.put<IStatement>(`${environment.apiUrl}/Role/${id}`, statement);
  }
  deleteStatement(id: string) {
    console.log(`${environment.apiUrl}/Statement/${id}`)
    return this.http.delete<IStatement>(`${environment.apiUrl}/Statement/${id}`);
  }
}
