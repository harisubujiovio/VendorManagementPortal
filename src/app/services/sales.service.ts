import { ISalesRoot } from './../models/ISalesRoot';
import { IDictionary } from './../models/IDictionary';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { handleError } from '../utils/errorhandler';
import { ISales } from '../models/ISales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  getList(sortField: string, sortOrder: string, filterValue: string, pageNumber: number,
    pageSize: number, partnerId?: string): Observable<ISalesRoot> {
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
    console.log(`${environment.apiUrl}/Sales/GetAll/?${params.toString()}`)
    return this.http.get<ISalesRoot>(`${environment.apiUrl}/Sales/GetAll/?${params.toString()}`).pipe(
      catchError(handleError<ISalesRoot>('getSales'))
    );
  }
  getById(id: string): Observable<ISales> {
    return this.http.get<ISales>(`${environment.apiUrl}/Sales/${id}`).pipe(
      tap(response => {
        console.log(response)
      })
    );
  }
  getDictionary(): Observable<IDictionary[]> {
    console.log(`${environment.apiUrl}/Sales/GetDictionary`)
    return this.http.get<IDictionary[]>(`${environment.apiUrl}/Sales/GetDictionary`).pipe(
      catchError(handleError<IDictionary[]>('getSalesDictionary'))
    );
  }
  createSales(sales: ISales): Observable<ISales> {
    console.log(sales);
    return this.http.post<ISales>(`${environment.apiUrl}/Sales`, sales);
  }
  updateSales(id: string, sales: ISales): Observable<ISales> {
    return this.http.put<ISales>(`${environment.apiUrl}/Sales/${id}`, sales);
  }
  deleteSales(id: string) {
    console.log(`${environment.apiUrl}/Sales/${id}`)
    return this.http.delete<ISales>(`${environment.apiUrl}/Sales/${id}`);
  }
}
