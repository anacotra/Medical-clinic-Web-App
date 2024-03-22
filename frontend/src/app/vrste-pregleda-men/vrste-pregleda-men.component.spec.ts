import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrstePregledaMenComponent } from './vrste-pregleda-men.component';

describe('VrstePregledaMenComponent', () => {
  let component: VrstePregledaMenComponent;
  let fixture: ComponentFixture<VrstePregledaMenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VrstePregledaMenComponent]
    });
    fixture = TestBed.createComponent(VrstePregledaMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
