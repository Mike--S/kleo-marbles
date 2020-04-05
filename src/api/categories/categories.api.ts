import { combineRoutes, EffectFactory } from '@marblejs/core';
import { getGenericListEffect$ } from '../common';
import { CategoriesDao } from './model';

const getCategoryList$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(getGenericListEffect$(CategoriesDao.findAll));

export const categories$ = combineRoutes('/categories', {
  effects: [getCategoryList$]
});
