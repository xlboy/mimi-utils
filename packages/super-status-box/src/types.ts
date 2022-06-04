export type SuperStatus = { key: string | number; alias?: string; unifyLabel: string };

// export type InferTypeOfSuperStatus<T extends Readonly<SuperStatus>> = {
//   keys: keyof T;
//   aliases: T[keyof T]['alias'];
// };

export type ParamsOfSuperStatusToOptions<T = any, D = any> = {
  returnAlias?: boolean;
  fieldNameOfKey?: string;
  fieldNameOfValue?: string;
  specifySymbolMerge: Array<[T, D]>;
};
