import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosPorAprobarComponent } from './pagos-por-aprobar.component';

describe('PagosPorAprobarComponent', () => {
  let component: PagosPorAprobarComponent;
  let fixture: ComponentFixture<PagosPorAprobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosPorAprobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosPorAprobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
