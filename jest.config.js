require('dotenv').config({ path: '.test.env' });

module.exports = {
  transform: {
    '.ts$': '@swc-node/jest',
  },
  collectCoverage: true,
  coverageReporters: ['text', 'html'],
  roots: ['src'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['scripts'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
