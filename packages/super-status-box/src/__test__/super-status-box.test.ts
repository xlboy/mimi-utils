import type { Expect, Equal } from '@type-challenges/utils';
import { defineSuperStatus } from '../define-super-status';
import { SuperStatusBox } from '../super-status-box';

describe('测试「状态别名」的筛选', () => {
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

    type Case = Expect<Equal<typeof target[number], typeof target[number]>>;
  });

  it('别名的挑选（pick）', () => {
    const origin = statusOrigin.pickAliases(['a-alias', 'b-alias']);
    const target = ['a-alias', 'b-alias'] as const;

    expect(origin).toMatchObject(target);

    type Case = Expect<Equal<typeof target[number], typeof target[number]>>;
  });

  it('别名的排除（omit）', () => {
    const origin = statusOrigin.omitAliases(['a-alias']);
    const target = ['b-alias', 'c-alias'] as const;

    expect(origin).toMatchObject(target);

    type Case = Expect<Equal<typeof target[number], typeof target[number]>>;
  });
});
