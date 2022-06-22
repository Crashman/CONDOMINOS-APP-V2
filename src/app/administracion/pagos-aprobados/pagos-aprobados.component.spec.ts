import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAprobadosComponent } from './pagos-aprobados.component';

describe('PagosAprobadosComponent', () => {
  let component: PagosAprobadosComponent;
  let fixture: ComponentFixture<PagosAprobadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosAprobadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
