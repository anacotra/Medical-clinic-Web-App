import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMenComponent } from './login-men.component';

describe('LoginMenComponent', () => {
  let component: LoginMenComponent;
  let fixture: ComponentFixture<LoginMenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMenComponent]
    });
    fixture = TestBed.createComponent(LoginMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
