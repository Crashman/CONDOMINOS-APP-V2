import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientosPorPagarComponent } from './requerimientos-por-pagar.component';

describe('MisRequerimientosPendietesPagoComponent', () => {
  let component: RequerimientosPorPagarComponent;
  let fixture: ComponentFixture<RequerimientosPorPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequerimientosPorPagarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimientosPorPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
