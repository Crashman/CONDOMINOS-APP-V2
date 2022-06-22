import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturasComponent } from './lecturas.component';

describe('LecturaComponent', () => {
  let component: LecturasComponent;
  let fixture: ComponentFixture<LecturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
