import { TestBed } from '@angular/core/testing';

import { PacijentAuthGuardService } from './pacijent-auth-guard.service';

describe('PacijentAuthGuardService', () => {
  let service: PacijentAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacijentAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
