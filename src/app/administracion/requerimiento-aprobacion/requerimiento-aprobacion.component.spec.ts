import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequerimientoAprobacionComponent } from './requerimiento-aprobacion.component';

describe('RequerimientosPorAprobarComponent', () => {
  let component: RequerimientoAprobacionComponent;
  let fixture: ComponentFixture<RequerimientoAprobacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequerimientoAprobacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimientoAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
