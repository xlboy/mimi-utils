import type { A, S } from "ts-toolbelt";

type _Get<
  Str extends string,
  StartChar extends string,
  EndChar extends string,
  DefaultStr extends string = "",
  StrContentArray extends string[] = [],
  InRange extends boolean = false
> = Str extends `${infer S}${infer RestS}`
  ? [S, InRange] extends [StartChar, false]
    ? _Get<RestS, StartChar, EndChar, "", StrContentArray, true>
    : [S, InRange] extends [EndChar, true]
    ? _Get<
        RestS,
        StartChar,
        EndChar,
        ``,
        [DefaultStr, ...StrContentArray],
        false
      >
    : InRange extends true
    ? _Get<
        RestS,
        StartChar,
        EndChar,
        `${DefaultStr}${S}`,
        StrContentArray,
        true
      >
    : _Get<RestS, StartChar, EndChar, "", StrContentArray, false>
  : StrContentArray[number];
/**
  获取两个字符之间的内容。例如取出 {与} 字符之间内容： `Hello, {name}`，即name
  
  @param Str 字符串源
  @param StartChar 需要作为获取条件的第一个字符串
  @param EndChar 需要作为获取条件的第二个字符串
  @example

  type Str = `hello, my name is {name}, are you from {country}?`;

  type Test1 = GetContentBetweenTwoChar<Str, '{', '}'>; // "name" | "country"

  type Test2 = GetContentBetweenTwoChar<Str, '{{', '}'>; // "第一个或第二个字符的长度不可超过1"

 */
export type GetContentBetweenTwoChar<
  Str extends string,
  StartChar extends string,
  EndChar extends string
> = A.Is<[S.Length<StartChar>, S.Length<EndChar>], [1, 1]> extends True
  ? _Get<Str, StartChar, EndChar>
  : "第一个或第二个字符的长度不可超过1";
