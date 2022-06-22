import { TestBed } from '@angular/core/testing';

import { DetcondominioService } from './detcondominio.service';

describe('DetcondominioService', () => {
  let service: DetcondominioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetcondominioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
