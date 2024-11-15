import { TestBed } from '@angular/core/testing';

import { RegistrosvotosService } from './registrosvotos.service';

describe('RegistrosvotosService', () => {
  let service: RegistrosvotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrosvotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
