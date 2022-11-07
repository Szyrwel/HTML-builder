const fs = require('fs');
const path = require('path');
const stdout = process.stdout;
const stdin = process.stdin;
const pathToFile = path.join(__dirname, 'text.txt');

fs.writeFile(
  pathToFile,
  '',
  (err) => {
    if(err) throw err;
  }
)

stdout.write('Напишите что-нибудь...\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit()
  } else {
    fs.appendFile (
      pathToFile,
      data,
      (err) => {
        if(err) throw err;
      }
    )
  }
  
})

process.on('SIGINT', process.exit)
process.on('exit', () => stdout.write('Удачи в изучении Node.js!'))