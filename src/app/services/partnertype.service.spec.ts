import { TestBed } from '@angular/core/testing';

import { PartnertypeService } from './partnertype.service';

describe('PartnertypeService', () => {
  let service: PartnertypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnertypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
