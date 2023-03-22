require('dotenv').config({ path: '.test.env' });

module.exports = {
  transform: {
    '.ts$': '@swc-node/jest',
  },
  collectCoverage: true,
  clearMocks: true,
  coverageReporters: ['text', 'html'],
  roots: ['src'],
  testEnvironment: 'node',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
