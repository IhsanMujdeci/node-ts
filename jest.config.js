require('dotenv').config({ path: '.test.env' });

module.exports = {
  transform: {
    '.ts$': '@swc-node/jest',
  },
  collectCoverage: true,
  coverageReporters: ['html', 'text'],
  roots: ['src'],
  testEnvironment: 'node',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
