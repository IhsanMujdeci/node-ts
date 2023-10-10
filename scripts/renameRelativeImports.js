const fs = require('fs');
const path = require('path');

// Function to recursively replace import paths in a directory
function renameImportPathsRecursively(directoryPath, oldName, newName) {
  fs.readdir(directoryPath, (err, items) => {
    if (err) {
      console.error(`Error reading directory ${directoryPath}: ${err}`);
      return;
    }
    items.forEach(item => {
      const itemPath = path.join(directoryPath, item);

      fs.stat(itemPath, (err, stats) => {
        if (err) {
          console.error(`Error getting file/directory info for ${itemPath}: ${err}`);
          return;
        }

        if (stats.isDirectory()) {
          // Recursively process subdirectories
          renameImportPathsRecursively(itemPath, oldName, newName);
        } else if (stats.isFile() && item.endsWith('.ts')) {
          // Process JavaScript files
          renameImportPaths(itemPath, oldName, newName);
        }
      });
    });
  });
}

// Function to replace import paths in a file
function renameImportPaths(filePath, oldName, newName) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}: ${err}`);
      return;
    }

    // Replace import paths
    let updatedData = data;
    const regex = new RegExp(oldName, 'g');
    updatedData = updatedData.replace(regex, newName);

    fs.writeFile(filePath, updatedData, 'utf8', err => {
      if (err) {
        console.error(`Error writing file ${filePath}: ${err}`);
      }
    });
  });
}

let [, filePath, oldName, newName] = process.argv;

const prepend = "from '";

renameImportPathsRecursively(
  path.resolve(filePath, '../../src'),
  prepend + oldName,
  prepend + newName,
);
