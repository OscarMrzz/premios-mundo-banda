import { TestBed } from '@angular/core/testing';

import { NominadosService } from './nominados.service';

describe('NominadosService', () => {
  let service: NominadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
