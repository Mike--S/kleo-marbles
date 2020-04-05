import { combineRoutes, EffectFactory } from '@marblejs/core';
import { versionEffect$, preflightEffect$, notFoundEffect$ } from './common/effects';
import { auth$ } from './auth';
import { users$ } from './users';
import { services$ } from './services';
import { categories$ } from './categories';

const root$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(versionEffect$);

const preflight$ = EffectFactory
  .matchPath('*')
  .matchType('OPTIONS')
  .use(preflightEffect$);

const notFound$ = EffectFactory
  .matchPath('*')
  .matchType('*')
  .use(notFoundEffect$);

export const api$ = combineRoutes('/api/v1', [
  root$,
  auth$,
  users$,
  services$,
  categories$,
  preflight$,
  notFound$
]);
