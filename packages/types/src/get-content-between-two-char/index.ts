import type { N, S } from 'ts-toolbelt';

/**
  获取两个字符之间的内容
  
  例如取出 `{` 与 `}` 字符之间内容，`Hello, {name}`，即 `name`

  ---
  
  场景：取出字符中的占位符（i18n-key、接口地址等等）
  
  @param Str 字符串源
  @param StartChar 需要作为获取条件的第一个字符
  @param EndChar 需要作为获取条件的第二个字符
  @category [String 类]
  @example

  ```ts

  type Str = `hello, my name is {name}, are you from {country}?`;

  type Test1 = GetContentBetweenTwoChar<Str, "{", "}">;
  type Test2 = GetContentBetweenTwoChar<Str, "{{", "}">;
  type Test3 = GetContentBetweenTwoChar<Str, "{", "}}">;
  type Test4 = GetContentBetweenTwoChar<Str, "", "">;
  type Test5 = GetContentBetweenTwoChar<Str, ".", "">;

  type cases = [
    Expect<Equal<Test1, "name" | "country">>,
    Expect<Equal<Test2, "The length of `StartChar` cannot be greater than 1">>,
    Expect<Equal<Test3, "The length of `EndChar` cannot be greater than 1">>,
    Expect<Equal<Test4, "`StartChar` cannot be empty">>,
    Expect<Equal<Test5, "`EndChar` cannot be empty">>,
  ];

  ```

 */
export type GetContentBetweenTwoChar<Str extends string, StartChar extends string, EndChar extends string> = [
  S.Length<StartChar>,
  S.Length<EndChar>
] extends [1, 1]
  ? _Get<Str, StartChar, EndChar>
  : _Warn<S.Length<StartChar>, S.Length<EndChar>>;

type _Get<
  Str extends string,
  StartChar extends string,
  EndChar extends string,
  DefaultStr extends string = '',
  StrContentArray extends string[] = [],
  InRange extends boolean = false
> = Str extends `${infer S}${infer RestS}`
  ? [S, InRange] extends [StartChar, false]
    ? _Get<RestS, StartChar, EndChar, '', StrContentArray, true>
    : [S, InRange] extends [EndChar, true]
    ? _Get<RestS, StartChar, EndChar, ``, [DefaultStr, ...StrContentArray], false>
    : InRange extends true
    ? _Get<RestS, StartChar, EndChar, `${DefaultStr}${S}`, StrContentArray, true>
    : _Get<RestS, StartChar, EndChar, '', StrContentArray, false>
  : StrContentArray[number];

type _Warn<SCharLength extends number, ECharLength extends number> = SCharLength extends 0
  ? '`StartChar` cannot be empty'
  : N.Greater<SCharLength, 1> extends _MTrue
  ? 'The length of `StartChar` cannot be greater than 1'
  : ECharLength extends 0
  ? '`EndChar` cannot be empty'
  : N.Greater<ECharLength, 1> extends _MTrue
  ? 'The length of `EndChar` cannot be greater than 1'
  : never;
