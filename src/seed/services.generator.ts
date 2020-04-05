import * as path from 'path';
import { map, switchMap } from 'rxjs/operators';
import { Service } from '../api/services/model/service.model';
import { generateCollectionFromModel } from './generator';
import { parseCsv$ } from './utils/csvParse';

const STATIC_PATH = path.resolve(__dirname, './csv/services.csv');

export const servicesGenerator$ = parseCsv$(STATIC_PATH).pipe(
  map(data => data.map(row => ({
    ...row,
    categoryId: 'hearDresser'
  }))),
  switchMap(categories => generateCollectionFromModel(Service)(categories)),
);
