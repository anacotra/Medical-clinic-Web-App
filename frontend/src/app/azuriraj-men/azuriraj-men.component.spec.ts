import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajMenComponent } from './azuriraj-men.component';

describe('AzurirajMenComponent', () => {
  let component: AzurirajMenComponent;
  let fixture: ComponentFixture<AzurirajMenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzurirajMenComponent]
    });
    fixture = TestBed.createComponent(AzurirajMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
