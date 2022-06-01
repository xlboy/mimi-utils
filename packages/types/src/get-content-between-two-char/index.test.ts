import type { Equal, Expect } from '@type-challenges/utils';
import type { GetContentBetweenTwoChar } from '.';

type Str = `hello, my name is {name}, are you from {country}?`;

type Test1 = GetContentBetweenTwoChar<Str, '{', '}'>;
type Test2 = GetContentBetweenTwoChar<Str, '{{', '}'>;
type Test3 = GetContentBetweenTwoChar<Str, '{', '}}'>;
type Test4 = GetContentBetweenTwoChar<Str, '', ''>;
type Test5 = GetContentBetweenTwoChar<Str, '.', ''>;

type cases = [
  Expect<Equal<Test1, 'name' | 'country'>>,
  Expect<Equal<Test2, 'The length of `StartChar` cannot be greater than 1'>>,
  Expect<Equal<Test3, 'The length of `EndChar` cannot be greater than 1'>>,
  Expect<Equal<Test4, '`StartChar` cannot be empty'>>,
  Expect<Equal<Test5, '`EndChar` cannot be empty'>>
];
