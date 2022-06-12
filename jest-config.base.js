/** @type {import('@jest/types').Config.InitialOptions} */
const jestConfig = {
  verbose: true,
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: ['/dist/'],
  transform: {
    '^.+\\.[t|j]s?$': 'esbuild-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: '.*\\.test\\.ts?$',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
};

export default jestConfig;
