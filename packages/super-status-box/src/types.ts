export type SuperStatus = { key: string | number; alias: string; unifyLabel: string };

export type ToListOptions = {
  /**
   * 是否在 List 中返回 `alias`
   */
  returnAlias?: boolean;
  /**
   * `status-key` 在 List 中所要映射的 `字段名`
   * @default value
   * @example
   *
   * // 例：
   * const fieldNameOfKey = 'label', statusKey = 'one-key';
   * // 则转成 -> [{ "label": "one-key" }]
   */
  fieldNameOfKey?: string;
  /**
   * `status-label` 在 List 中所要映射的 `字段名`
   * @default label
   * @example
   *
   * // 例：
   * const fieldNameOfLabel = 'label', statusLabel = 'one-label';
   * // 则转成 -> [{ "label": "one-label" }]
   */
  fieldNameOfLabel?: string;
};

export type ToEnumOptions<T> = {
  /**
   * 要对 Enum 内容进行替换的分组
   */
  groupToReplace: ReadonlyArray<[statusAlias: T, nameToReplace: string]>;
};
