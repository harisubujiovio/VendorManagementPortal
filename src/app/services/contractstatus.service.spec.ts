import { TestBed } from '@angular/core/testing';

import { ContractstatusService } from './contractstatus.service';

describe('ContractstatusService', () => {
  let service: ContractstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
