import { TestBed } from '@angular/core/testing';

import { NoUsuariosGuard } from './no-usuarios.guard';

describe('NoUsuariosGuard', () => {
  let guard: NoUsuariosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoUsuariosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
