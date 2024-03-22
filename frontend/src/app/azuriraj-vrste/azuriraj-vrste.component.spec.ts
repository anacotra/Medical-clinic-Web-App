import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajVrsteComponent } from './azuriraj-vrste.component';

describe('AzurirajVrsteComponent', () => {
  let component: AzurirajVrsteComponent;
  let fixture: ComponentFixture<AzurirajVrsteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzurirajVrsteComponent]
    });
    fixture = TestBed.createComponent(AzurirajVrsteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
