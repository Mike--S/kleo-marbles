import { HttpEffect, use, HttpError, HttpStatus } from '@marblejs/core';
import { t, requestValidator$ } from '@marblejs/middleware-io';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ServicesDao } from '../../services/model';
import { neverNullable } from '../../../util';

const validator$ = requestValidator$({
  query: t.type({
    categoryId: t.string,
  })
});

export const getServicesEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req => of(req.query.categoryId).pipe(
      mergeMap(ServicesDao.findByCategoryId),
      mergeMap(neverNullable),
      map(body => ({ body })),
      catchError(() => throwError(
        new HttpError('Service does not exist', HttpStatus.NOT_FOUND)
      ))
    ))
  );
