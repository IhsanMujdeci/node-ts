const pkg = require('../package.json');
const fs = require('fs');

function getNodeTypesVersion() {
  return pkg.devDependencies['@types/node'];
}

function updatePackageJsonEngines(projectRoot, nodeVersion) {
  if (!pkg.engines) {
    pkg.engines = {};
  }
  pkg.engines.node = nodeVersion;
  fs.writeFileSync(projectRoot + '/package.json', JSON.stringify(pkg, null, 2));
}

module.exports = {
  getNodeTypesVersion,
  updatePackageJsonEngines,
};
