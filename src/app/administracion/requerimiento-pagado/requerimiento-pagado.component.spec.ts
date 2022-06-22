import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoPagadoComponent } from './requerimiento-pagado.component';

describe('RequerimientoPagadoComponent', () => {
  let component: RequerimientoPagadoComponent;
  let fixture: ComponentFixture<RequerimientoPagadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequerimientoPagadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimientoPagadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
