import { IResourceRoot } from './../models/IResourceRoot';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { handleError } from '../utils/errorhandler';

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T> {

  private readonly APIUrl = environment.apiUrl + this.getResourceUrl();

  constructor(protected httpClient: HttpClient) { }
  abstract getResourceUrl(): string;

  toServerModel(entity: T): any {
    return entity;
  }

  fromServerModel(json: any): T {
    return json;
  }
  getDictionary(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.APIUrl}/GetDictionary`)
      .pipe(
        catchError(handleError<T[]>('getDictionary'))
      );
  }

  getList(sortField: string, sortOrder: string, filterValue: string, pageNumber: number, pageSize: number): Observable<IResourceRoot> {
    let params = new HttpParams()
      .set('pageNo', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortCol', sortField)
      .set('sortType', sortOrder);
    console.log(this.APIUrl)
    console.log(`${this.APIUrl}?${params.toString()}`)
    return this.httpClient.get<IResourceRoot>(`${this.APIUrl}?${params.toString()}`)
      .pipe(
        catchError(handleError<IResourceRoot>('getList'))
      );
  }

  get(id: string | number): Observable<T> {
    return this.httpClient.get<T>(`${this.APIUrl}/${id}`)
      .pipe(
        map((json) => this.fromServerModel(json)),
        catchError(handleError<T>('get'))
      );
  }

  create(resource: T): Observable<any> {
    console.log(`${this.APIUrl}`)
    return this.httpClient.post(`${this.APIUrl}/`, this.toServerModel(resource))
      .pipe(
        catchError(handleError<T>('create'))
      );
  }

  delete(id: string | number): Observable<any> {
    return this.httpClient.delete(`${this.APIUrl}/${id}`)
      .pipe(
        catchError(handleError<T>('delete'))
      );
  }

  update(id: string | number, resource: T) {
    return this.httpClient.put(`${this.APIUrl}/${id}/`, this.toServerModel(resource))
      .pipe(
        catchError(handleError<T>('update'))
      );
  }

}
