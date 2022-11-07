const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

async function readFolder() {
  const items = await fs.promises.readdir(pathToFolder, {withFileTypes: true});
  items.forEach(async item => {
    if (item.isFile()) {
      const pathToFile = path.join(pathToFolder, item.name);
      const stat = await fs.promises.stat(pathToFile);
      const fileName = path.basename(pathToFile, path.extname(pathToFile));
      const fileExtension = path.extname(pathToFile).slice(1);
    console.log(`${fileName} - ${fileExtension} - ${stat.size}b`)
  }
  })
}

readFolder()