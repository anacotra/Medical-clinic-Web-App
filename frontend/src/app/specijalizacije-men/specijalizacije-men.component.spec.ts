import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecijalizacijeMenComponent } from './specijalizacije-men.component';

describe('SpecijalizacijeMenComponent', () => {
  let component: SpecijalizacijeMenComponent;
  let fixture: ComponentFixture<SpecijalizacijeMenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecijalizacijeMenComponent]
    });
    fixture = TestBed.createComponent(SpecijalizacijeMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
