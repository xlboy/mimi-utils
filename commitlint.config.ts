import type { UserConfig } from '@commitlint/types';

const commitlintConfig: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // * 添加 新功能、新特性 等
        'feat',
        // * 修复 BUG
        'fix',
        // * 文档的修改
        'docs',
        // * 基础建设层的修改 (例：调整单元测试环境或配置、调整某构建层的配置（vite.config.ts）、调整 .npmrc 配置、调整 package.json 里与依赖项无关的内容等)
        'chore',
        // * 代码 (css、js、ts等) 格式的调整
        'style',
        // * 某段代码的重构，非 新增功能、修改BUG
        'refactor',
        // * CI（Continuous Integration - 持续集成） 相关的文件改动，例：gitlab-ci、docker 等
        'ci',
        // * 测试用例的修改
        'test',
        // * 可向后兼容的业务功能性能优化
        'perf',
        // * 版本回退、文件回退、代码回退等
        'revert',
        // * TypeScript 类型的修改
        'types',
        // * package.json 依赖项（dependencies、devDependencies）的调整，「新增/移除/升级」等
        'deps',
        // * CQ（Code Quality - 代码质量），即与代码质量相关的调整（例：代码结构的调整、变量命名的调整、代码注释的调整等）
        'cq',
        // * WIP（Work in Progress - 工作进行中），工作尚未完成，暂提交一部分
        'wip'
      ]
    ]
  }
};

export default commitlintConfig;
