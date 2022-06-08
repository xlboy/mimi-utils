export type SuperStatus = { key: string | number; alias: string; unifyLabel: string };

export type GetOptionsParams<T = any, D = any> = {
  /**
   * 是否在 `options` 中返回 `alias`
   */
  returnAlias?: boolean;
  /**
   * `status-key` 在 `options` 中所要映射的 `字段名`
   *
   * 例：
   *
   * const fieldNameOfKey = 'label', statusKey = 'one-key';
   *
   * 则转成 -> [{ "label": "one-key" }]
   * */
  fieldNameOfKey?: string;
  fieldNameOfValue?: string;
  specifySymbolMerge: Array<[T, D]>;
};

export type OptionsOfGetEnum<T> = {
  /**
   * 要对 Enum 内容进行替换的分组
   */
  groupToReplace: ReadonlyArray<[statusAlias: T, nameToReplace: string]>;
};
