import { TestBed } from '@angular/core/testing';

import { AccesibilidadWebService } from './accesibilidad-web.service';

describe('AccesibilidadWebService', () => {
  let service: AccesibilidadWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesibilidadWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
