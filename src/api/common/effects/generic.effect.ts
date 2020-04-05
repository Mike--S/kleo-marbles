import { HttpEffect } from '@marblejs/core';
import { flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const getGenericListEffect$ = (findAll: () => Observable<{body: any}>): HttpEffect => req$ =>
  req$.pipe(
      flatMap(findAll),
      map(body => ({ body })),
  );
