import { TestBed } from '@angular/core/testing';

import { NoInvitadoGuard } from './no-invitado.guard';

describe('NoInvitadoGuard', () => {
  let guard: NoInvitadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoInvitadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
