const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function readFolder() {
    const items = await fs.promises.readdir(folderPath, { withFileTypes: true });
    const files = items.filter(item => item.isFile())
    files.forEach(file => {
        const filePath = path.join(folderPath, file.name);
        const ext = path.extname(filePath);
        const obj = path.parse(filePath);
        const name = obj.name;
        async function getSize() {
            const statObj = await fs.promises.stat(filePath);
            const size = statObj.size;
            console.log(`${name} - ${ext.slice(1)} - ${size}b`)
        }
        getSize()
    }

    )

}

readFolder()