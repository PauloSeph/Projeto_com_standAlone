import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cursoResolverResolver } from './curso-resolver.resolver';

describe('cursoResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cursoResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
