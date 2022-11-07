const fs = require('fs');
const path = require('path');
const stdout = process.stdout;

const pathToFile = path.join(__dirname, 'text.txt');
fs.readFile(
    pathToFile,
    'utf-8',
    (err, data) => {
        if(err) {
            throw err
        };
        stdout.write(data);
    }
)