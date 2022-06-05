export type SuperStatus = { key: string | number; alias: string; unifyLabel: string };

export type ParamsOfSuperStatusToOptions<T = any, D = any> = {
  returnAlias?: boolean;
  fieldNameOfKey?: string;
  fieldNameOfValue?: string;
  specifySymbolMerge: Array<[T, D]>;
};
