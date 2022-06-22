import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientosPorAprobarComponent } from './requerimientos-por-aprobar.component';

describe('RequerimientosPorAprobarComponent', () => {
  let component: RequerimientosPorAprobarComponent;
  let fixture: ComponentFixture<RequerimientosPorAprobarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequerimientosPorAprobarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimientosPorAprobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
