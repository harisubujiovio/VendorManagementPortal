import { IContractRoot } from './../models/IContractRoot';
import { IContract } from './../models/IContract';

import { IDictionary } from './../models/IDictionary';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { handleError } from '../utils/errorhandler';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }
  getList(sortField: string, sortOrder: string, filterValue: string, pageNumber: number, pageSize: number,
    partnerId?: string): Observable<IContractRoot> {
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
    console.log(`${environment.apiUrl}/Contract/GetAll/?${params.toString()}`)
    return this.http.get<IContractRoot>(`${environment.apiUrl}/Contract/GetAll/?${params.toString()}`).pipe(
      catchError(handleError<IContractRoot>('getContracts'))
    );
  }
  getById(id: string): Observable<IContract> {
    return this.http.get<IContract>(`${environment.apiUrl}/Contract/${id}`).pipe(
      tap(response => {
        console.log(response)
      })
    );
  }
  getDictionary(): Observable<IDictionary[]> {
    console.log(`${environment.apiUrl}/Contract/GetDictionary`)
    return this.http.get<IDictionary[]>(`${environment.apiUrl}/Contract/GetDictionary`).pipe(
      catchError(handleError<IDictionary[]>('getContractsDictionary'))
    );
  }
  createContract(contract: IContract): Observable<IContract> {
    return this.http.post<IContract>(`${environment.apiUrl}/Contract`, contract);
  }
  updateContract(id: string, contract: IContract): Observable<IContract> {
    return this.http.put<IContract>(`${environment.apiUrl}/Contract/${id}`, contract);
  }
  deleteContract(id: string) {
    console.log(`${environment.apiUrl}/Contract/${id}`)
    return this.http.delete<IContract>(`${environment.apiUrl}/Contract/${id}`);
  }
}
