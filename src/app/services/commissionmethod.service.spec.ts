import { TestBed } from '@angular/core/testing';

import { CommissionmethodService } from './commissionmethod.service';

describe('CommissionmethodService', () => {
  let service: CommissionmethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommissionmethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
