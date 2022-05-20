const fs = require('fs');
const path = require('path');

const filePath2 = './text.txt';
const filePath = path.join(__dirname, 'text.txt')
console.log(filePath)

const readStream = fs.createReadStream(filePath, 'utf-8');
readStream.on('data', (chunk) => {
    console.log(chunk)
})


