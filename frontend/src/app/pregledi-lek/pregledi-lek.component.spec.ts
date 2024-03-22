import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreglediLekComponent } from './pregledi-lek.component';

describe('PreglediLekComponent', () => {
  let component: PreglediLekComponent;
  let fixture: ComponentFixture<PreglediLekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreglediLekComponent]
    });
    fixture = TestBed.createComponent(PreglediLekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
