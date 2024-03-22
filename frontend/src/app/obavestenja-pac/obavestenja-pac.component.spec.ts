import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavestenjaPacComponent } from './obavestenja-pac.component';

describe('ObavestenjaPacComponent', () => {
  let component: ObavestenjaPacComponent;
  let fixture: ComponentFixture<ObavestenjaPacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObavestenjaPacComponent]
    });
    fixture = TestBed.createComponent(ObavestenjaPacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
