import type { L, O } from 'ts-toolbelt';
import type { GetKeyPathsByObject } from '.';
import type { Equal } from '@type-challenges/utils';

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

/*
  "a" | "a.b" | "a.b.0" | "a.b[0]" | "a.b.1" | "a.b[1]" | 
  "a.b.1.c" | "a.b[1].c" | "a.b.1.c.0" | "a.b[1].c[0]"
*/
type Test2 = GetKeyPathsByObject<TestObj1, { returnType: 'string' }>;
const case2: Test2[] = ['a', 'a.b.1.c.0', 'a.b[1].c[0]'];

/* 
  "a" | "['a']" | "a.b" | "['a']['b']" | "a.b.0" | "a.b[0]" |
  "['a']['b']['0']" | "a.b.1" | "a.b[1]" | "['a']['b']['1']" |
  "a.b.1.c" | "a.b[1].c" | "['a']['b']['1']['c']" | "a.b.1.c.0" | 
  "a.b[1].c[0]" | "['a']['b']['1']['c']['0']"
*/
type Test3 = GetKeyPathsByObject<TestObj1, { returnType: 'string'; returnStringTypes: ['R1', 'R2', 'R3'] }>;
const case3: Test3[] = ["['a']['b']['0']", 'a.b.1.c.0', "['a']['b']['1']['c']['0']", 'a.b[1].c[0]'];
