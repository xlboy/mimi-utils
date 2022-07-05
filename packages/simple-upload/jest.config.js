import _ from 'lodash';
import baseJestConfig from '../../jest-config.base.mjs';

/** @type {import('@jest/types').Config.InitialOptions} */
const jestConfig = {};

export default _.merge(jestConfig, baseJestConfig);
