import { defineSuperStatus } from '../define-super-status';
import type { SuperStatus } from '../types';

jest.useFakeTimers();

it('测试基本的状态定义', () => {
  const status: SuperStatus[] = [{ key: 'online', unifyLabel: '在线', alias: '在线' }];

  expect(defineSuperStatus(status)).toMatchObject(status);
});
