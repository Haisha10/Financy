import { TestBed } from '@angular/core/testing';

import { FinancesCoreService } from './finances-core.service';

describe('FinancesCoreService', () => {
  let service: FinancesCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancesCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
