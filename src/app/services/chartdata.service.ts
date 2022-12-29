import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICardSummary } from '../models/ICardSummary';
import { ResourceService } from './resource.service';


@Injectable({
  providedIn: 'root'
})
export class ChartdataService {

  constructor(protected httpClient: HttpClient) {
  }
  getCardSummaryData() {
    return this.httpClient.get<ICardSummary[]>(`${environment.apiUrl}/CardSummary/GetAll`);
  }
}
