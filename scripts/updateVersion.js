const path = require('path');
const fs = require('fs');
const packageJson = require('../package.json');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const srcPath = path.resolve('.');
const file = path.resolve(srcPath, 'src/datepicker.js');

module.exports = async () => {
    const datepickerFile = await readFile(file, 'UTF-8');
    const updatedFile = datepickerFile.replace(/static version = '(.+)'/, (match, $1) => {
        return match.replace($1, packageJson.version);
    });

    await writeFile(file, updatedFile);
};
