import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosRechazadosComponent } from './pagos-rechazados.component';

describe('PagosRechazadosComponent', () => {
  let component: PagosRechazadosComponent;
  let fixture: ComponentFixture<PagosRechazadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosRechazadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosRechazadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
