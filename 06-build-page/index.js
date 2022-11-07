const fs = require('fs');
const path = require('path');

const pathToFolderAssets = path.join(__dirname, 'assets');
const pathToFolderComponents = path.join(__dirname, 'components');
const pathToFolderStyles = path.join(__dirname, 'styles');
const pathToFileTemplate = path.join(__dirname, 'template.html')
const pathToFolderProjectDist = path.join(__dirname, 'project-dist')

fs.mkdir(pathToFolderProjectDist, (err) => {
  if(err) {
    throw err
  }
})

async function buildStyles() {
  const pathToStyleFolderInProjectDist = path.join(pathToFolderProjectDist, 'style.css');
  const files = await fs.promises.readdir(pathToFolderStyles, {withFileTypes:true});
  await fs.promises.writeFile(pathToStyleFolderInProjectDist, '');
  const writeStreamCss = fs.createWriteStream(pathToStyleFolderInProjectDist);
  files.forEach((file) => {
    if(file.isFile() && file.name.slice(-4) === '.css') {
    const pathToFile = path.join(pathToFolderStyles, file.name);
    fs.createReadStream(pathToFile, 'utf-8').pipe(writeStreamCss);
    }
  })
}

async function buildHTML () {
  let template = await fs.promises.readFile(pathToFileTemplate,'utf-8');
  const pathToHtml = path.join(pathToFolderProjectDist, 'index.html');
  const components = await fs.promises.readdir(pathToFolderComponents);
  for (let i = 0; i < components.length; i++) {
    let component = components[i];
    const pathToComponent = path.join(pathToFolderComponents, component);
    const componentCode = await fs.promises.readFile(pathToComponent, 'utf-8');
    const templateTag = (`{{${component.slice(0,-5)}}}`);
    template = template.replace(templateTag, componentCode);
    await fs.promises.writeFile(pathToHtml, template);
  }
}

async function copyAssets (pathToFolderAssets, pathToFolderProjectDist) {
  const pathToCopy = path.join(pathToFolderProjectDist, path.parse(pathToFolderAssets).name);
  await fs.promises.rm(pathToCopy, {recursive: true, force: true});
  await fs.promises.mkdir(pathToCopy, {recursive: true});
  const items = await fs.promises.readdir(pathToFolderAssets, {withFileTypes : true});
  items.forEach( (item) => {
    const source = path.join(pathToFolderAssets, item.name);
    const copy = path.join(pathToCopy, item.name);
    if(item.isDirectory()) {
      copyAssets(source, pathToCopy);
    } else {
      fs.promises.copyFile(source, copy);
    }
  });
}

async function buildPage () {
  await buildStyles();
  await buildHTML();
  await copyAssets(pathToFolderAssets, pathToFolderProjectDist);
}

buildPage();