import { TestBed } from '@angular/core/testing';

import { EmploymentsService } from './employments.service';

describe('EmploymentsService', () => {
  let service: EmploymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
