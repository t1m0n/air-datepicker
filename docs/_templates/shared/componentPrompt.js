// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const fs = require('fs');
const path = require('path');

let componentsPath = path.join(__dirname, '../../components');
let componentsPaths = fs.readdirSync(componentsPath);

module.exports = [
    {
        type: 'select',
        name: 'directory',
        message: 'Укажите директорию (по умолчанию `components/`)',
        choices: ['.', ...componentsPaths]
    }
];
