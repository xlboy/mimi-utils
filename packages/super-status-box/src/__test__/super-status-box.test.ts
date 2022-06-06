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

  describe('获取所有枚举', () => {
    it('不传参，默认取所有', () => {
      expect(statusOrigin.getAllEnum()).toMatchObject({
        'a-key': 'a-别名',
        'b-key': 'b-别名'
      });
    });

    it('传 groupToReplace 参，替换某个状态对应的文案', () => {
      expect(statusOrigin.getAllEnum({ groupToReplace: [['a-alias', '替换后的A别名']] })).toMatchObject({
        'a-key': '替换后的A别名',
        'b-key': 'b-别名'
      });
    });
  });
});
