import { Category } from './category.model';
import { getGenericDao } from '../../common/daos/generic.dao';

export const CategoriesDao = getGenericDao(Category);
