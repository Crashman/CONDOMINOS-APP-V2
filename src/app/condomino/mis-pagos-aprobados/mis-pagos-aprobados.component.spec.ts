import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPagosAprobadosComponent } from './mis-pagos-aprobados.component';

describe('MisPagosAprobadosComponent', () => {
  let component: MisPagosAprobadosComponent;
  let fixture: ComponentFixture<MisPagosAprobadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPagosAprobadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPagosAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
