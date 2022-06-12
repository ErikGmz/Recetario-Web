import { TestBed } from '@angular/core/testing';

import { NoAdministradorGuard } from './no-administrador.guard';

describe('NoAdministradorGuard', () => {
  let guard: NoAdministradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAdministradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
