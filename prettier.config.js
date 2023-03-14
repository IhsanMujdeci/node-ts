const requireJSON5 = require('require-json5');
const tsConfig = requireJSON5('./tsconfig.json');

// Get keys of tsconfig path aliases.
const regPaths = Object.keys(tsConfig.compilerOptions.paths)
  .map(k => k.replace('*', ''))
  .join('|');

module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  printWidth: 100,
  importOrder: ['^(' + regPaths + ')', '^\\.{1,2}'],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
};
