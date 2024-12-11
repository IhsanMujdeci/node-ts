require('dotenv').config({ path: '.test.env' });

module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc-node/jest'],
  },
  collectCoverage: true,
  clearMocks: true,
  coverageReporters: ['text', 'html'],
  rootDir: 'src',
  testEnvironment: 'node',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
