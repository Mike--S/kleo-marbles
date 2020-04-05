import { combineRoutes, EffectFactory } from '@marblejs/core';
import { getServicesEffect$ } from './effects';

const getServices$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(getServicesEffect$);

export const services$ = combineRoutes('/services', {
  effects: [getServices$]
});
