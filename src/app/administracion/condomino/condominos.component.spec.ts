import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondominosComponent } from './condominos.component';

describe('PropietarioComponent', () => {
  let component: CondominosComponent;
  let fixture: ComponentFixture<CondominosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondominosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondominosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
