import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidiProfilComponent } from './vidi-profil.component';

describe('VidiProfilComponent', () => {
  let component: VidiProfilComponent;
  let fixture: ComponentFixture<VidiProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VidiProfilComponent]
    });
    fixture = TestBed.createComponent(VidiProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
