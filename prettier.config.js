// Get all paths from compilerOptions.paths and format them in a regex that targets any imports starting with them
function regexPathsFromTsConfig(tsConfigPath) {
  const stripCommentsRegex = /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g;
  let rawConfig = require('fs').readFileSync(tsConfigPath, { encoding: 'utf8' });
  let strippedConfig = rawConfig.replace(stripCommentsRegex, (m, g) => (g ? '' : m));
  let config = JSON.parse(strippedConfig);
  const regexKeys = Object.keys(config.compilerOptions.paths)
    .map(k => k.replace('*', ''))
    .join('|');
  return '^(' + regexKeys + ')';
}

// Any imports that start with a "." or ".."
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
