import type { Equal, Expect } from '@type-challenges/utils';
import type { IsPositiveInteger } from '.';

type cases = [
  Expect<Equal<IsPositiveInteger<1111>, true>>,
  Expect<Equal<IsPositiveInteger<1111.111>, false>>,
  Expect<Equal<IsPositiveInteger<'11123123.123.123.123'>, false>>,
  Expect<Equal<IsPositiveInteger<'.123.???????kj'>, false>>,
  Expect<Equal<IsPositiveInteger<'1231231230123012301230123'>, true>>
];
