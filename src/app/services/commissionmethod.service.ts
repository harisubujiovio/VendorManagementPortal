import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResource } from '../models/IResource';
import { IResourceRoot } from '../models/IResourceRoot';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class CommissionmethodService extends ResourceService<IResource>{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return '/CommissionMethod';
  }
}
