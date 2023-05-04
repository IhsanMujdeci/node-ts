const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { updatePackageJsonEngines, getNodeTypesVersion } = require('./nodeEngine');

const [_, filePath, nodeVersion] = process.argv;

if (!nodeVersion) {
  console.error('err: No node version provided');
  process.exit(1);
}

const projectRoot = path.join(filePath, '../../');
let config = fs.readFileSync(projectRoot + 'tsconfig.json', 'utf-8');

const extendsKeyValue = '  "extends": "@tsconfig/node' + nodeVersion + '/tsconfig.json",';
let matchNodeBase = config.match(/@tsconfig\/node\d+/);
let existingNodeBase = matchNodeBase && matchNodeBase[0];
// Insert string for new node config extends in config
if (existingNodeBase) {
  config = config.replace(/^.*"extends": .*$/m, extendsKeyValue);
} else {
  // match first new line after open curly brace
  const match = config.match(/(?<={\n)/);
  config = `${config.slice(0, match.index)}${extendsKeyValue}\n${config.slice(match.index)}`;
}

(async () => {
  try {
    const newNodeBase = '@tsconfig/node' + nodeVersion;

    try {
      require.resolve(newNodeBase + '/tsconfig.json');
      console.log(newNodeBase, 'already installed');
    } catch (_) {
      console.log('Installing', newNodeBase);
      await execPromise('npm i --save-dev ' + newNodeBase);
    }

    const types = '@types/node@' + nodeVersion;
    console.log('Installing', types);
    await execPromise('npm i --save-dev ' + types);

    console.log('Updating package.json engines');
    updatePackageJsonEngines(projectRoot, getNodeTypesVersion());

    console.log('Updating .nvmrc');
    await execPromise('echo ' + nodeVersion + ' > .nvmrc');

    if (existingNodeBase && newNodeBase !== existingNodeBase) {
      console.log('Uninstalling', existingNodeBase);
      await execPromise('npm uninstall ' + existingNodeBase);
    }

    console.log('Updating tsconfig.json');
    fs.writeFileSync(projectRoot + 'tsconfig.json', config);
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, function (error, stdout, stderr) {
      if (stdout) {
        return resolve(stdout);
      }
      if (stderr) {
        return reject(stderr);
      }
      if (error !== null) {
        return reject(error);
      }
    });
  });
}
