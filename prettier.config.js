// Get all paths from compilerOptions.paths and format them in a regex that targets any imports starting with them
function regexPathsFromTsConfig(tsConfigPath) {
  let rawConfig = require('fs').readFileSync(tsConfigPath, { encoding: 'utf8' });

  // Replace trailing commas and stripped comments
  const stripCommentsRegex = /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g;
  const stripTrailingComma = /,(?!\s*?[{\["'\w])/g;

  let strippedConfig = rawConfig
    .replace(stripCommentsRegex, (m, g) => (g ? '' : m))
    .replace(stripTrailingComma, (m, g) => (g ? '' : m));

  let config = JSON.parse(strippedConfig);
  if (!config.compilerOptions || !config.compilerOptions.paths) {
    return null;
  }
  const regexKeys = Object.keys(config.compilerOptions.paths)
    .map(k => k.replace('*', ''))
    .join('|');
  return '^(' + regexKeys + ')';
}

const importOrder = [];
const pathRegex = regexPathsFromTsConfig('./tsconfig.json');
if (pathRegex) {
  const relativeImportsRegex = '^\\.{1,2}';
  importOrder.push(pathRegex, relativeImportsRegex);
}

module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  printWidth: 100,
  importOrder: importOrder,
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
};
