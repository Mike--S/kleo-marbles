import { Database } from '@connection';
import { from, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { servicesGenerator$ } from './services.generator';
import { categoriesGenerator$ } from './categories.generator';

const REGISTERED_GENERATORS = [
  servicesGenerator$,
  categoriesGenerator$
];

from(Database.connect()).pipe(
  switchMap(() => from(Database.drop())),
  switchMap(() => zip(...REGISTERED_GENERATORS)),
  switchMap(() => from(Database.disconnect()))
).subscribe(a => console.log('final'));

