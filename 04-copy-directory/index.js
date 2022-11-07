const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'files');
const pathToCopyFolder = path.join(__dirname, 'files-copy');

async function copyFolder (pathToFolder, pathToCopyFolder) {
  await fs.promises.rm(pathToCopyFolder, {recursive: true, force: true});
  await fs.promises.mkdir(pathToCopyFolder);
  const files = await fs.promises.readdir(pathToFolder);
  files.forEach(file => {
    fs.promises.copyFile(
      path.join(pathToFolder, file),
      path.join(pathToCopyFolder, file)
    )
  })
}

copyFolder(pathToFolder, pathToCopyFolder);