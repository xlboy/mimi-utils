import type { Equal, Expect } from '@type-challenges/utils';
import { defineSuperStatus } from '../define-super-status';
import { SuperStatusBox } from '../super-status-box';

describe('状态别名的筛选', () => {
  const definedStatus = defineSuperStatus([
    { alias: 'a-alias', key: 'a-key', unifyLabel: 'a-别名' },
    { alias: 'b-alias', key: 'b-key', unifyLabel: 'b-别名' },
    { alias: 'c-alias', key: 'c-key', unifyLabel: 'c-别名' }
  ] as const);

  const statusOrigin = new SuperStatusBox(definedStatus);

  it('获取所有别名', () => {
    const origin = statusOrigin.aliasOf();
    const target = ['a-alias', 'b-alias', 'c-alias'] as const;

    expect(origin).toMatchObject(target);

    type Case = Expect<Equal<typeof origin[number], typeof target[number]>>;
  });

  it('别名的挑选（pick）', () => {
    const origin = statusOrigin.pickAliases(['a-alias', 'b-alias']);
    const target = ['a-alias', 'b-alias'] as const;

    expect(origin).toMatchObject(target);

    type Case = Expect<Equal<typeof origin[number], typeof target[number]>>;
  });

  it('别名的排除（omit）', () => {
    const origin = statusOrigin.omitAliases(['a-alias']);
    const target = ['b-alias', 'c-alias'] as const;

    expect(origin).toMatchObject(target);

    type Case = Expect<Equal<typeof origin[number], typeof target[number]>>;
  });
});

describe('状态转枚举', () => {
  const definedStatus = defineSuperStatus([
    { alias: 'a-alias', key: 'a-key', unifyLabel: 'a-别名' },
    { alias: 'b-alias', key: 'b-key', unifyLabel: 'b-别名' }
  ] as const);

  const statusOrigin = new SuperStatusBox(definedStatus);

  describe('取所有枚举', () => {
    it('不传参，默认取所有', () => {
      expect(statusOrigin.toEnum()).toMatchObject({
        'a-key': 'a-别名',
        'b-key': 'b-别名'
      });
    });

    it('传 options.groupToReplace 参，替换某个状态对应的文案（unifyLabel）', () => {
      expect(statusOrigin.toEnum({ groupToReplace: [['a-alias', '替换后的A别名']] })).toMatchObject({
        'a-key': '替换后的A别名',
        'b-key': 'b-别名'
      });
    });
  });

  describe('按别名取相应的枚举', () => {
    it('传指定别名', () => {
      expect(statusOrigin.toEnumByAliases(['a-alias'])).toMatchObject({
        'a-key': 'a-别名'
      });
    });

    it('传指定别名，以及传 options.groupToReplace 参来替换某个状态对应的文案（unifyLabel）', () => {
      expect(
        statusOrigin.toEnumByAliases(['b-alias'], {
          groupToReplace: [['b-alias', '替换了的B']]
        })
      ).toMatchObject({
        'b-key': '替换了的B'
      });
    });
  });
});

describe('查找 status-key', () => {
  const definedStatus = defineSuperStatus([
    { alias: 'a-alias', key: 'a-key', unifyLabel: 'a-别名' },
    { alias: 'b-alias', key: 'b-key', unifyLabel: 'b-别名' },
    { alias: 'c-alias', key: 'c-key', unifyLabel: 'c-别名' }
  ] as const);

  const statusOrigin = new SuperStatusBox(definedStatus);

  it('根据单个别名查找', () => {
    const foundKey = statusOrigin.findKeyByAlias('b-alias');

    expect(foundKey).toBe('b-key');

    type Case = Expect<Equal<typeof foundKey, 'b-key' | undefined>>;
  });

  it('根据多个别名查找', () => {
    const foundKeys = statusOrigin.findKeysByAliases(['b-alias', 'c-alias']);

    expect(foundKeys).toMatchObject(['b-key', 'c-key']);
  });
});

describe('查找 status-label', () => {
  const definedStatus = defineSuperStatus([
    { alias: 'a-alias', key: 'a-key', unifyLabel: 'a-别名' },
    { alias: 'b-alias', key: 'b-key', unifyLabel: 'b-别名' },
    { alias: 'c-alias', key: 'c-key', unifyLabel: 'c-别名' }
  ] as const);

  const statusOrigin = new SuperStatusBox(definedStatus);

  it('根据单个别名查找', () => {
    const foundLabel = statusOrigin.findLabelByAlias('b-alias');

    expect(foundLabel).toBe('b-别名');

    type Case = Expect<Equal<typeof foundLabel, 'b-别名' | undefined>>;
  });

  it('根据多个别名查找', () => {
    const foundKeys = statusOrigin.findLabelsByAliases(['b-alias', 'c-alias']);

    expect(foundKeys).toMatchObject(['b-别名', 'c-别名']);
  });
});

describe('状态转列表', () => {
  const definedStatus = defineSuperStatus([
    { alias: 'a-alias', key: 'a-key', unifyLabel: 'a-别名' },
    { alias: 'b-alias', key: 'b-key', unifyLabel: 'b-别名' },
    { alias: 'c-alias', key: 'c-key', unifyLabel: 'c-别名' }
  ] as const);

  const statusOrigin = new SuperStatusBox(definedStatus);

  describe('取所有列表', () => {
    it('不传参，默认取所有', () => {
      expect(statusOrigin.toList()).toMatchObject([
        { value: 'a-key', label: 'a-别名' },
        { value: 'b-key', label: 'b-别名' },
        { value: 'c-key', label: 'c-别名' }
      ]);
    });

    it('传 options.groupToReplace 参，替换某个状态对应的文案（unifyLabel）', () => {
      expect(statusOrigin.toList({ groupToReplace: [['a-alias', '替换后的A别名']] })).toMatchObject([
        { value: 'a-key', label: '替换后的A别名' },
        { value: 'b-key', label: 'b-别名' },
        { value: 'c-key', label: 'c-别名' }
      ]);
    });

    it('传 options.returnAlias 参，列表中的每个项都会带上 alias 属性', () => {
      expect(statusOrigin.toList({ returnAlias: true })).toMatchObject([
        { value: 'a-key', label: 'a-别名', alias: 'a-alias' },
        { value: 'b-key', label: 'b-别名', alias: 'b-alias' },
        { value: 'c-key', label: 'c-别名', alias: 'c-alias' }
      ]);
    });

    it('传 options.fieldNameOfLabel 参，列表中的每个项对应的 [unifyLabel] 值都会赋给 [fieldNameOfLabel值] 的键上', () => {
      const fieldNameOfLabel = 'fieldName';

      expect(statusOrigin.toList({ fieldNameOfLabel })).toMatchObject([
        { value: 'a-key', [fieldNameOfLabel]: 'a-别名' },
        { value: 'b-key', [fieldNameOfLabel]: 'b-别名' },
        { value: 'c-key', [fieldNameOfLabel]: 'c-别名' }
      ]);
    });

    it('传 options.fieldNameOfKey 参，列表中的每个项对应的 [key] 值都会赋给 [fieldNameOfKey值] 的键上', () => {
      const fieldNameOfKey = 'status';

      expect(statusOrigin.toList({ fieldNameOfKey })).toMatchObject([
        { [fieldNameOfKey]: 'a-key', label: 'a-别名' },
        { [fieldNameOfKey]: 'b-key', label: 'b-别名' },
        { [fieldNameOfKey]: 'c-key', label: 'c-别名' }
      ]);
    });

    it('传 options 中的 fieldNameOfKey、returnAlias、fieldNameOfLabel、groupToReplace 参进行混合测试', () => {
      const fieldNameOfLabel = 'fieldName';
      const fieldNameOfKey = 'kkk';

      expect(
        statusOrigin.toList({
          fieldNameOfLabel,
          fieldNameOfKey,
          returnAlias: true,
          groupToReplace: [['c-alias', '我改']]
        })
      ).toMatchObject([
        { [fieldNameOfKey]: 'a-key', [fieldNameOfLabel]: 'a-别名', alias: 'a-alias' },
        { [fieldNameOfKey]: 'b-key', [fieldNameOfLabel]: 'b-别名', alias: 'b-alias' },
        { [fieldNameOfKey]: 'c-key', [fieldNameOfLabel]: '我改', alias: 'c-alias' }
      ]);
    });
  });

  describe('按别名取相应的列表', () => {
    it('传指定别名', () => {
      expect(statusOrigin.toListByAliases(['a-alias'])).toMatchObject([{ label: 'a-别名', value: 'a-key' }]);
    });

    it('传指定别名，以及传 options.groupToReplace 参来替换某个状态对应的文案（unifyLabel）', () => {
      expect(
        statusOrigin.toListByAliases(['b-alias'], {
          groupToReplace: [['b-alias', '替换了的B']]
        })
      ).toMatchObject([{ value: 'b-key', label: '替换了的B' }]);
    });

    it('传指定别名，传 options.returnAlias 参，列表中的指定项会带上 alias 属性', () => {
      expect(statusOrigin.toListByAliases(['a-alias', 'b-alias'], { returnAlias: true })).toMatchObject([
        { value: 'a-key', label: 'a-别名', alias: 'a-alias' },
        { value: 'b-key', label: 'b-别名', alias: 'b-alias' }
      ]);
    });

    it('传指定别名，传 options.fieldNameOfLabel 参，列表中的指定项对应的 [unifyLabel] 值都会赋给 [fieldNameOfLabel值] 的键上', () => {
      const fieldNameOfLabel = 'fieldName';

      expect(statusOrigin.toListByAliases(['a-alias', 'c-alias'], { fieldNameOfLabel })).toMatchObject([
        { value: 'a-key', [fieldNameOfLabel]: 'a-别名' },
        { value: 'c-key', [fieldNameOfLabel]: 'c-别名' }
      ]);
    });

    it('传指定别名，传 options.fieldNameOfKey 参，列表中的指定项对应的 [key] 值都会赋给 [fieldNameOfKey值] 的键上', () => {
      const fieldNameOfKey = 'status';

      expect(statusOrigin.toListByAliases(['a-alias'], { fieldNameOfKey })).toMatchObject([
        { [fieldNameOfKey]: 'a-key', label: 'a-别名' }
      ]);
    });

    it('传指定别名，传 options 中的 fieldNameOfKey、returnAlias、fieldNameOfLabel、groupToReplace 参进行混合测试', () => {
      const fieldNameOfKey = 'status';
      const fieldNameOfLabel = 'my-label';

      expect(
        statusOrigin.toListByAliases(['a-alias', 'c-alias'], {
          fieldNameOfKey,
          fieldNameOfLabel,
          returnAlias: true,
          groupToReplace: [
            ['a-alias', '改后的a'],
            ['c-alias', '改后的c']
          ]
        })
      ).toMatchObject([
        { [fieldNameOfKey]: 'a-key', [fieldNameOfLabel]: '改后的a', alias: 'a-alias' },
        { [fieldNameOfKey]: 'c-key', [fieldNameOfLabel]: '改后的c', alias: 'c-alias' }
      ]);
    });
  });
});
