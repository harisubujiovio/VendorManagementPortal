import { TestBed } from '@angular/core/testing';

import { ContracttypeService } from './contracttype.service';

describe('ContracttypeService', () => {
  let service: ContracttypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContracttypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
