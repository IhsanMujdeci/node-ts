const fs = require('fs');

/**
 * Get paths from tsconfig.json and add them in the import order
 * Output will look like ^(@app/|@log/)
 *
 * @param {string }tsConfigPath
 * @return {string}
 */
function regexPathsFromTsConfig(tsConfigPath) {
  let config = fs.readFileSync(tsConfigPath, { encoding: 'utf8' });
  // get all strings that start with @ followed by any characters and followed by *":
  return '^(' + config.match(/@.+(?=\*":)/g).join('|') + ')';
}

const relativeImportsRegex = '^\\.{1,2}';

module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  printWidth: 100,
  importOrder: [regexPathsFromTsConfig('./tsconfig.json'), relativeImportsRegex],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
};
