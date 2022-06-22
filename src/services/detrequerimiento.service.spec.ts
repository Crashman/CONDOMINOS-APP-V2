import { TestBed } from '@angular/core/testing';

import { DetrequerimientoService } from './detrequerimiento.service';

describe('DetrequerimientoService', () => {
  let service: DetrequerimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetrequerimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
