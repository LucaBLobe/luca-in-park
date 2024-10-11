import { TestBed } from '@angular/core/testing';

import { PrecosService } from './precos.service';

describe('PrecosService', () => {
  let service: PrecosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
