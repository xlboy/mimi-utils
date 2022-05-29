import type { Equal, Expect } from "@type-challenges/utils";
import type { GetContentBetweenTwoChar } from ".";

type Str = `hello, my name is {name}, are you from {country}?`;

type Test1 = GetContentBetweenTwoChar<Str, "{", "}">; // "name" | "country"
type Test2 = GetContentBetweenTwoChar<Str, "{{", "}">; // "第一个或第二个字符的长度不可超过1"

type cases = [
  Expect<Equal<Test1, "name" | "country">>,
  Expect<Equal<Test2, "第一个或第二个字符的长度不可超过1">>
];
