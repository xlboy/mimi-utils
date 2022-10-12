import type { L } from 'ts-toolbelt';
import type { defineSuperStatus } from './define-super-status';
import type { ToEnumOptions, ToListOptions } from './types';

export class SuperStatusBox<
  S extends ReturnType<typeof defineSuperStatus>,
  UnionStatusKeys extends S[number]['key'] = S[number]['key'],
  UnionStatusAliases extends S[number]['alias'] = S[number]['alias'],
  UnionStatusLabels extends S[number]['unifyLabel'] = S[number]['unifyLabel']
> {
  constructor(private readonly status: S) {}

  /** 返回所有别名 */
  aliasOf = (): UnionStatusAliases[] => {
    return this.status.map(item => item.alias as UnionStatusAliases);
  };

  /** 挑选部分别名 */
  pickAliases = <T extends UnionStatusAliases>(aliases: ReadonlyArray<T>): ReadonlyArray<T> => {
    return this.status.filter(item => aliases.includes(item.alias as T)).map(item => item.alias as T);
  };

  /** 排除部分别名，返回未被排除的那一部分 */
  omitAliases = <T extends UnionStatusAliases>(
    aliases: ReadonlyArray<T>
  ): ReadonlyArray<Exclude<UnionStatusAliases, T>> => {
    return this.status
      .filter(item => !aliases.includes(item.alias as any))
      .map(item => item.alias as UnionStatusAliases) as any;
  };

  /** 转成列表 */
  toList = (options?: ToListOptions<UnionStatusAliases>) => {
    const hasOptions = options !== undefined;

    return hasOptions ? this.statusConverToListByOptions(this.status, options!) : this.statusConverToList(this.status);
  };

  /** 根据别名转成相应的列表 */
  toListByAliases = <T extends UnionStatusAliases>(
    aliases: ReadonlyArray<T>,
    options?: ToListOptions<typeof aliases[number]>
  ) => {
    const hasOptions = options !== undefined;

    const filteredStatusByAliases = this.status.filter(item => aliases.includes(item.alias as T)) as unknown as S;

    return hasOptions
      ? this.statusConverToListByOptions(filteredStatusByAliases, options as any)
      : this.statusConverToList(filteredStatusByAliases);
  };

  // TODO: 类型待完善
  private statusConverToList = (status: S) => {
    return status.map(item => ({
      label: item.unifyLabel,
      value: item.key
    }));
  };

  // TODO: 类型待完善
  private statusConverToListByOptions = (status: S, options: ToListOptions<UnionStatusAliases>) => {
    const { fieldNameOfKey = 'value', fieldNameOfLabel = 'label', returnAlias, groupToReplace = [] } = options;

    return status.map(item => {
      const mergeSource: Record<string, any> = {
        [fieldNameOfKey]: item.key,
        // 默认赋值，可能会因为「groupToReplace」而改变
        [fieldNameOfLabel]: item.unifyLabel
      };

      if (returnAlias) mergeSource['alias'] = item.alias;

      const matchingReplaceSource = groupToReplace.find(([statusAlias]) => statusAlias === item.alias);

      if (matchingReplaceSource) {
        const [, labelToReplace] = matchingReplaceSource;

        mergeSource[fieldNameOfLabel] = labelToReplace;
      }

      return mergeSource;
    });
  };

  /** 转成枚举 */
  toEnum = (options?: ToEnumOptions<UnionStatusAliases>) => {
    const hasOptions = options !== undefined;

    return hasOptions ? this.statusConverToEnumByOptions(this.status, options!) : this.statusConverToEnum(this.status);
  };

  /** 根据别名转成相应的枚举 */
  toEnumByAliases = <T extends UnionStatusAliases>(
    aliases: ReadonlyArray<T>,
    options?: ToEnumOptions<UnionStatusAliases>
  ) => {
    const hasOptions = options !== undefined;

    const filteredStatusByAliases = this.status.filter(item => aliases.includes(item.alias as T)) as unknown as S;

    return hasOptions
      ? this.statusConverToEnumByOptions(filteredStatusByAliases, options!)
      : this.statusConverToEnum(filteredStatusByAliases);
  };

  private statusConverToEnumByOptions = (status: S, options: ToEnumOptions<UnionStatusAliases>) => {
    const { groupToReplace } = options;

    return status.reduce((preValue, currentValue) => {
      const mergeSource: Record<string, string> = {
        // 默认赋值，可能会因为「groupToReplace」而改变
        [currentValue.key]: currentValue.unifyLabel
      };

      const matchingReplaceSource = groupToReplace.find(([statusAlias]) => statusAlias === currentValue.alias);

      if (matchingReplaceSource) {
        const [, labelToReplace] = matchingReplaceSource;

        mergeSource[currentValue.key] = labelToReplace;
      }

      return {
        ...preValue,
        ...mergeSource
      };
    }, {} as Record<UnionStatusKeys, string>);
  };

  private statusConverToEnum = (status: S) => {
    return status.reduce((preValue, currentValue) => {
      return {
        ...preValue,
        [currentValue.key]: currentValue.unifyLabel
      };
    }, {} as Record<UnionStatusKeys, string>);
  };

  /** 根据单个别名查找相应的 status-key */
  findKeyByAlias = <T extends UnionStatusAliases>(alias: T): S[L.SelectKeys<S, { alias: T }>]['key'] | undefined => {
    const foundKey = this.status.find(item => item.alias === alias);

    return foundKey?.key as any;
  };

  /** 根据多个别名查找相应的 status-key */
  findKeysByAliases = <T extends ReadonlyArray<UnionStatusAliases>>(
    aliases: T
  ): /** TODO: 此类型待完善 */ UnionStatusKeys[] => {
    const foundKeys = this.status.filter(item => aliases.includes(item.alias as any)).map(item => item.key);

    return foundKeys as any;
  };

  /** 根据单个别名查找相应的 status-label */
  findLabelByAlias = <T extends UnionStatusAliases>(
    alias: T
  ): S[L.SelectKeys<S, { alias: T }>]['unifyLabel'] | undefined => {
    const foundKey = this.status.find(item => item.alias === alias);

    return foundKey?.unifyLabel as any;
  };

  /** 根据多个别名查找相应的 status-label */
  findLabelsByAliases = <T extends ReadonlyArray<UnionStatusAliases>>(
    aliases: T
  ): /** TODO: 此类型待完善 */ UnionStatusLabels[] => {
    const foundLabels = this.status.filter(item => aliases.includes(item.alias as any)).map(item => item.unifyLabel);

    return foundLabels as any;
  };
}
