import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autenGuard } from './auten.guard';

describe('autenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
