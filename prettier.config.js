const fs = require('fs');

/**
 * Get paths from tsconfig.json and add them in the import order
 * Output will look like ^(@app/|@log/)
 *
 * @param {string} tsConfigPath
 * @return {string | null}
 */
function regexPathsFromTsConfig(tsConfigPath) {
  let config = fs.readFileSync(tsConfigPath, { encoding: 'utf8' });
  const match = config.match(/@.+(?=\*":)/g);
  if (!match) {
    return null;
  }
  // get all strings that start with @ followed by any characters and before *": characters
  return `^(${match.join('|')})`;
}
const relativeImportsRegex = '^\\.{1,2}';
const importOrder = [relativeImportsRegex];
const tsConfigPathRegex = regexPathsFromTsConfig('./tsconfig.json');
if (tsConfigPathRegex) {
  importOrder.unshift(tsConfigPathRegex);
}

console.log(importOrder);

module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  printWidth: 100,
  importOrder,
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
};
