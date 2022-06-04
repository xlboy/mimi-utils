import type { SuperStatus } from './types';

export function defineSuperStatus<T extends SuperStatus>(superStatus: ReadonlyArray<T>) {
  return superStatus;
}
