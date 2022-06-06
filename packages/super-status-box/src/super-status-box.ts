import type { SuperStatus, GetOptionsParams } from './types';

export class SuperStatusBox<
  S extends ReturnType<typeof defineSuperStatus>,
  UnionStatusKeys extends S[number]['key'] = S[number]['key'],
  UnionStatusAliases extends S[number]['alias'] = S[number]['alias']
> {
  constructor(private readonly status: S) {}

  keysOf = (keys: string[]) => {
    this.status;
  };

  // getAllKeys = () => Object.keys(this.status) as Array<UnionStatusKeys>;

  // getAllAliases = () => Object.values(this.status).map(item => item.alias) as Array<UnionStatusAliases>;

  // getAllOptions = (
  //   params?: Omit<GetOptionsParams, 'specifySymbolMerge'> & {
  //     eachMergeContent?: Record<string, any>;
  //   }
  // ) => {
  //   const {
  //     returnAlias = false,
  //     fieldNameOfKey = 'value',
  //     fieldNameOfValue = 'label',
  //     eachMergeContent = {}
  //   } = params ?? {};

  //   return Object.entries(this.status).map(([k, v]) => ({
  //     [fieldNameOfKey]: k,
  //     [fieldNameOfValue]: v.unifyLabel,
  //     ...eachMergeContent,
  //     ...(returnAlias ? { alias: v.alias as UnionStatusAliases } : {})
  //   }));
  // };

  // getOptionsByKeys = <T extends UnionStatusKeys>(
  //   keys: ReadonlyArray<T>,
  //   params?: GetOptionsParams<T, Record<string, any>>
  // ) => {
  //   const { fieldNameOfKey = 'value', fieldNameOfValue = 'label', specifySymbolMerge = [] } = params ?? {};

  //   return Object.entries(this.status)
  //     .filter(([k]) => keys.includes(k as T))
  //     .map(([k, v]) => ({
  //       [fieldNameOfKey]: k,
  //       [fieldNameOfValue]: v.unifyLabel,
  //       ...specifySymbolMerge.find(([_key]) => _key === k)
  //     }));
  // };

  // getOptionsByAliases = <T extends UnionStatusAliases>(
  //   aliases: ReadonlyArray<T>,
  //   params?: GetOptionsParams<T, Record<string, any>>
  // ) => {
  //   const { fieldNameOfKey = 'value', fieldNameOfValue = 'label', specifySymbolMerge = [] } = params ?? {};

  //   return Object.entries(this.status)
  //     .filter(([, v]) => aliases.includes(v.alias as T))
  //     .map(([k, v]) => ({
  //       [fieldNameOfKey]: k,
  //       [fieldNameOfValue]: v.unifyLabel,
  //       ...specifySymbolMerge.find(([_aliases]) => _aliases === (v.alias as T))
  //     }));
  // };

  // getAllEnum = () => {
  //   return Object.entries(this.status).reduce((preV, [k, v]) => ({ ...preV, [k]: v.unifyLabel }), {});
  // };

  // getEnumByKeys = <T extends UnionStatusKeys>(keys: ReadonlyArray<T>) => {
  //   return Object.entries(this.status)
  //     .filter(([k]) => keys.includes(k as T))
  //     .reduce((preV, [k, v]) => ({ ...preV, [k]: v.unifyLabel }), {});
  // };

  // getEnumByAliases = <T extends UnionStatusAliases>(aliases: ReadonlyArray<T>) => {
  //   return Object.entries(this.status)
  //     .filter(([, v]) => aliases.includes(v.alias as T))
  //     .reduce((preV, [k, v]) => ({ ...preV, [k]: v.unifyLabel }), {});
  // };

  // findKeyByAlias = <T extends UnionStatusAliases>(alias: T) => {
  //   const [[key]] = Object.entries(this.status).filter(([, v]) => (v.alias as T) === alias);

  //   return key;
  // };

  // findKeysByAliases = <T extends UnionStatusAliases>(aliases: ReadonlyArray<T>) => {
  //   const keys = Object.entries(this.status)
  //     .filter(([, v]) => aliases.includes(v.alias as T))
  //     .map(([k]) => k);

  //   return keys;
  // };
}
