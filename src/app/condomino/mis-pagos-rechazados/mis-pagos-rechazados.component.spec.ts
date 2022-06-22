import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPagosRechazadosComponent } from './mis-pagos-rechazados.component';

describe('MisPagosRechazadosComponent', () => {
  let component: MisPagosRechazadosComponent;
  let fixture: ComponentFixture<MisPagosRechazadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPagosRechazadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPagosRechazadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
