import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RquerimientosPagadosComponent } from './requerimientos-pagados.component';

describe('RquerimientosPagadosComponent', () => {
  let component: RquerimientosPagadosComponent;
  let fixture: ComponentFixture<RquerimientosPagadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RquerimientosPagadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RquerimientosPagadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
