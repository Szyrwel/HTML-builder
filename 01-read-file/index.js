const fs = require('fs');
const path = require('path');
const stdout = process.stdout;

const pathToFile = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(pathToFile, 'utf-8');

readStream.on('data', (chunk) => {
    console.log(chunk);
})