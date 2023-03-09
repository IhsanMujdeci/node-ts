const requireJSON5 = require('require-json5');
const tsConfig = requireJSON5('./tsconfig.json');

const regPaths = Object.keys(tsConfig.compilerOptions.paths)
  .map(k => k.replace('*', ''))
  .join('|');

module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  printWidth: 100,
  importOrder: ['^(' + regPaths + ')'],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
};
