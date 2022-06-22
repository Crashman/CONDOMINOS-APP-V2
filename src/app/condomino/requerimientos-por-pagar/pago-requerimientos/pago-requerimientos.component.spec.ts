import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoRequerimientosComponent } from './pago-requerimientos.component';

describe('PagoRequerimientosComponent', () => {
  let component: PagoRequerimientosComponent;
  let fixture: ComponentFixture<PagoRequerimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoRequerimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoRequerimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
