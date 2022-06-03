import type { O, L, U, S, A } from 'ts-toolbelt';
import type { If } from 'ts-toolbelt/out/Any/If'
import type { IsPositiveInteger } from '../is-positive-integer';

type _GetArrayPaths<Source extends object> = O.Paths<Source>;

// @ts-expect-error - O.Paths 返回的是 ReadonlyArray，Join 接收的是 Array，因此产生冲突。但其实是可省略的。
type _GetStringPaths<Source extends object, RTypes extends _Options['returnStringTypes'], P extends string[] = L.Required<O.Paths<Source>>, PP extends P = P> = P extends PP ? _KeysToUnionKeyPath<P>[RTypes[number]][number] : never;


/** 字符中是否包含 `.` */
type _IsContainPoint<Str extends string> = '.' extends S.Split<Str>[number] ? true : false;

type _R1Add<S extends string[], T extends string> = `${L.Last<S>}${S.Length<L.Last<S>> extends 0 ? '' : '.'}${T}`;

type _R2Add<S extends string[], T extends string> = `${L.Last<S>}[${T}]`;

type _R3Add<S extends string[], T extends string> = `${L.Last<S>}['${T}']`;

type _R4Add<S extends string[], T extends string> = `${L.Last<S>}["${T}"]`;

type _KeysToUnionKeyPath<
  Keys extends (number | string)[],
  // a.c.0
  R1 extends string[] = [''],
  // a.c[0]
  R2 extends string[] = [''],
  // ['a']['c'][0]
  R3 extends string[] = [''],
  // [a][c][0]
  R4 extends string[] = [''],
  K = any
> = Keys extends [infer FirstKey extends string, ...infer OtherKey extends string[]]
  ? IsPositiveInteger<FirstKey> extends true
    // 是正整数
    ? _KeysToUnionKeyPath<OtherKey, [...R1, _R1Add<R1, FirstKey>], [...R2, _R2Add</* 因为 R2 需要接上 R1 …（a.c、a.c[0]） */ L.Length<R2> extends 1 ? R1 : R2, FirstKey>], [...R3, _R3Add<R3, FirstKey>], [...R4, _R4Add<R4, FirstKey>]>
    : _IsContainPoint<FirstKey> extends true
    // 此次的 key 中包含 `.`，不可加入 `R1 中
    ? _KeysToUnionKeyPath<OtherKey, R1, [...R2, _R2Add<R2, FirstKey>], [...R3, _R3Add<R3, FirstKey>], [...R4, _R4Add<R4, FirstKey>]>
    // 正常的字符 key
    : _KeysToUnionKeyPath<OtherKey, [...R1, _R1Add<R1, FirstKey>], [...R2, _R1Add<R2, FirstKey>], [...R3, _R3Add<R3, FirstKey>], [...R4, _R4Add<R4, FirstKey>]>
  : {
    R1: L.Filter<R1, ''>;
    R2:  L.Filter<R2, ''>;
    R3:  L.Filter<R3, ''>;
    R4:  L.Filter<R4, ''>;
  };

interface _Options {
  returnType: 'array' | 'string';
  /** 
   * 返回的字符类型
   * R1 = a.c.0 
   * R2 = a.c[0]
   * R3 = ['a']['c']['0']
   */
  returnStringTypes?: ('R1'| 'R2'| 'R3')[]
}


/**
  获取对象的 `键路径`

  ---
  场景：lodash-set、lodash-get 等

  @param Source Object 源
  @param Options 获取的选项
  @returns 由 `Options` 中的 `returnType` 字段决定是 `Array` 或 `String`，默认为 `Array`
  @category [Object 类]
  @example
  ```ts
  type TestObj1 = {
    a: {
      b: [1, { c: [1] }];
    };
  };

  // ["a"?, "b"?, "0"?] | ["a"?, "b"?, "1"?, "c"?, "0"?]
  type Test1 = GetKeyPathsByObject<TestObj1>;
  const case1: Test1[] = [
  ['a', 'b', '0'],
  ['a', 'b']
];


  // "a" | "a.b" | "a.b.0" | "a.b[0]" | "a.b.1" | "a.b[1]" | 
  // "a.b.1.c" | "a.b[1].c" | "a.b.1.c.0" | "a.b[1].c[0]"
  type Test2 = GetKeyPathsByObject<TestObj1, { returnType: 'string' }>;
  const case2: Test2[] = ['a', 'a.b.1.c.0', 'a.b[1].c[0]'];


  // "a" | "['a']" | "a.b" | "['a']['b']" | "a.b.0" | "a.b[0]" |
  // "['a']['b']['0']" | "a.b.1" | "a.b[1]" | "['a']['b']['1']" |
  // "a.b.1.c" | "a.b[1].c" | "['a']['b']['1']['c']" | "a.b.1.c.0" | 
  //"a.b[1].c[0]" | "['a']['b']['1']['c']['0']"  
  type Test3 = GetKeyPathsByObject<TestObj1, { returnType: 'string'; returnStringTypes: ['R1', 'R2', 'R3'] }>;
  const case3: Test3[] = ["['a']['b']['0']", 'a.b.1.c.0', "['a']['b']['1']['c']['0']", 'a.b[1].c[0]'];

  ```
 */
export type GetKeyPathsByObject<
  Source extends object,
  Options extends _Options = { returnType: 'array'; }
> = Options['returnType'] extends 'array' ? _GetArrayPaths<Source> : _GetStringPaths<Source, unknown extends Options['returnStringTypes'] ? ['R1', 'R2'] : Options['returnStringTypes']>





