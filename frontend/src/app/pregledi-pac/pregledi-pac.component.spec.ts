import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreglediPacComponent } from './pregledi-pac.component';

describe('PreglediPacComponent', () => {
  let component: PreglediPacComponent;
  let fixture: ComponentFixture<PreglediPacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreglediPacComponent]
    });
    fixture = TestBed.createComponent(PreglediPacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
