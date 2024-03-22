import { TestBed } from '@angular/core/testing';

import { LekarAuthGuardService } from './lekar-auth-guard.service';

describe('LekarAuthGuardService', () => {
  let service: LekarAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LekarAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
