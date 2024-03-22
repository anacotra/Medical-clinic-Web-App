import { TestBed } from '@angular/core/testing';

import { ZahtevZaRegistracijuService } from './zahtev-za-registraciju.service';

describe('ZahtevZaRegistracijuService', () => {
  let service: ZahtevZaRegistracijuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZahtevZaRegistracijuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
