import { TestBed } from '@angular/core/testing';

import { MenadzerAuthGuardService } from './menadzer-auth-guard.service';

describe('MenadzerAuthGuardService', () => {
  let service: MenadzerAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenadzerAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
