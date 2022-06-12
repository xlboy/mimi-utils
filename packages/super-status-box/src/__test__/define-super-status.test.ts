import { defineSuperStatus } from '../define-super-status';

jest.useFakeTimers();

it('测试基本的状态定义', () => {
  const statusOrigin = [
    { key: '1', unifyLabel: 'A1 炸弹', alias: 'A1' },
    { key: '2', unifyLabel: 'A2 炸弹', alias: 'A2' },
    { key: '3', unifyLabel: 'A3 炸弹', alias: 'A3' }
  ] as const;

  expect(defineSuperStatus(statusOrigin)).toMatchObject(statusOrigin);
});
