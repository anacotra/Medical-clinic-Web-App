import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaLekComponent } from './tabela-lek.component';

describe('TabelaLekComponent', () => {
  let component: TabelaLekComponent;
  let fixture: ComponentFixture<TabelaLekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaLekComponent]
    });
    fixture = TestBed.createComponent(TabelaLekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
