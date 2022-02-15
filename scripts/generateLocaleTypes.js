const path = require('path');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const ejs = require('ejs');

let srcPath = path.resolve(__dirname, '../src');
let distPath = path.resolve(__dirname, '../dist/locale');
let templatePath = path.resolve(__dirname, './localeTypeContent.ejs');

module.exports = async () => {
    let fileNames = await readdir(path.resolve(srcPath, 'locale'));
    let template = await readFile(templatePath, 'UTF-8');

    return fileNames.map((fileName) => {
        let localeName = fileName.replace(/\.js/, '');
        let typeName = `${localeName}.d.ts`;
        return writeFile(path.join(distPath, typeName), ejs.render(template, {locale: localeName}));
    });
};


