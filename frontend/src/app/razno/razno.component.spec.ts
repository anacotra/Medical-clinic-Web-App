import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaznoComponent } from './razno.component';

describe('RaznoComponent', () => {
  let component: RaznoComponent;
  let fixture: ComponentFixture<RaznoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaznoComponent]
    });
    fixture = TestBed.createComponent(RaznoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
