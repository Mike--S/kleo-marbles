import { createReadStream, ReadStream } from 'fs';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const streamToSubject = (stream: ReadStream) => {
  const dataStream$ = new ReplaySubject<string>(1);

  stream.on('data', chunk => {
    dataStream$.next(chunk.toString());
  });

  stream.on('end', () => {
    dataStream$.complete();
  });

  stream.on('error', error => {
    console.log(error);
    dataStream$.error(error);
  });

  return dataStream$;
};

export const parseCsv$ = (path: string): Observable<any[]> =>
  streamToSubject(createReadStream(path)).pipe(
    map(chunk => chunk.split('\n')),
    map(rows => {
      const colNames = (rows.shift() || '').split(',');
      return rows
        .filter(row => !!row.trim())
        .map(row => row.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/g))
        .map(cols => cols.reduce((res, col, ind) => ({
          ...res,
          [colNames[ind]]: col
        }), {}));
    }),
    catchError(err => {
      console.log(err);
      return of([]);
    })
  );
