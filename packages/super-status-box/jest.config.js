import _ from 'lodash';
import baseJestConfig from '../../jest-config.base.js';

/** @type {import('@jest/types').Config.InitialOptions} */
const jestConfig = {};

export default _.merge(baseJestConfig, jestConfig);
