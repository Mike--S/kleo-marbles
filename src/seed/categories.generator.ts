import * as path from 'path';
import { switchMap } from 'rxjs/operators';
import { Category } from '../api/categories/model';
import { generateCollectionFromModel } from './generator';
import { parseCsv$ } from './utils/csvParse';

const STATIC_PATH = path.resolve(__dirname, './csv/categories.csv');

export const categoriesGenerator$ = parseCsv$(STATIC_PATH).pipe(
  switchMap(categories => generateCollectionFromModel(Category)(categories)),
);
