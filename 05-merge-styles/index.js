const fs = require('fs');
const path = require('path');
const pathToFolderStyles = path.join(__dirname, 'styles');
const pathToFileBundler= path.join(__dirname, 'project-dist', 'bundle.css'); 
const writeStream = fs.createWriteStream(pathToFileBundler)

async function createFileCSS () {
  const files = await fs.promises.readdir(pathToFolderStyles, {withFileTypes:true});
  files.forEach((file) => {
    if(file.isFile() && file.name.slice(-4) === '.css') {
    const pathToFile = path.join(pathToFolderStyles, file.name);
    fs.createReadStream(pathToFile, 'utf-8').pipe(writeStream);
    }
  })
}

createFileCSS ()