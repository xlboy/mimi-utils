import type { SuperStatus } from './types';
import type { L, U } from 'ts-toolbelt';

type VerifyStatusAliasRepeat<T extends ReadonlyArray<SuperStatus>> = L.Length<
  U.ListOf<T[number]['alias']>
> extends L.Length<T>
  ? true
  : false;

export function defineSuperStatus<T extends ReadonlyArray<SuperStatus>>(
  superStatus: T extends (VerifyStatusAliasRepeat<T> extends true ? T : false) ? T : '别名不可重复'
) {
  return superStatus as typeof superStatus & { readonly '_必须通过 defineSuperStatus 函数创建_': [never] };
}
