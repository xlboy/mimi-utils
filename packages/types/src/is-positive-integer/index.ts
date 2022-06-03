import type { U, S } from 'ts-toolbelt';

type VolidIntegerChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type _Is<N extends string> = N extends `${infer FirstChar}${infer RestChar}`
  ? FirstChar extends VolidIntegerChar
    ? _Is<RestChar>
    : false
  : true;

/**
  是否为正整数
  @param N 需验证的 字符 或 整数
  @returns boolean
  @category [Number 类]
  @example 

  ```ts
  type cases = [
    Expect<Equal<IsPositiveInteger<1111>, true>>,
    Expect<Equal<IsPositiveInteger<1111.111>, false>>,
    Expect<Equal<IsPositiveInteger<'11123123.123.123.123'>, false>>,
    Expect<Equal<IsPositiveInteger<'.123.???????kj'>, false>>,
    Expect<Equal<IsPositiveInteger<'1231231230123012301230123'>, true>>
  ];
  ```
 */
export type IsPositiveInteger<N extends string | number> = _Is<`${N}`>;
