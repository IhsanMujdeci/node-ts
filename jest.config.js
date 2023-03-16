require('dotenv').config({ path: '.test.env' });

module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc-node/jest',
  },
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'text'],
  roots: ['src'],
  testEnvironment: 'node',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
