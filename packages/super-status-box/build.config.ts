import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['./src/index'],
  // TODO: 待测试 .d.ts 的具体模样。（或许会用回 api-extractor）
  declaration: true // generate .d.ts files
});
