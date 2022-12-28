import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResource } from '../models/IResource';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export abstract class ContracttypeService extends ResourceService<IResource> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return '/ContractType';
  }
}
