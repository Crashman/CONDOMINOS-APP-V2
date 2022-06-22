import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoCreacionComponent } from './requerimiento-creacion.component';

describe('RequerimientosPendientesComponent', () => {
  let component: RequerimientoCreacionComponent;
  let fixture: ComponentFixture<RequerimientoCreacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequerimientoCreacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimientoCreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
