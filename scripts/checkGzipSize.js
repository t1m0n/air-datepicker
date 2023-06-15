const {gzip} = require('node-gzip');
const {readFile} = require('node:fs/promises');
const path = require('node:path');
const chalk = require('chalk');

const desirableSize = 13.5;

async function checkSize() {
    const filePath = path.resolve(__dirname, '../dist/air-datepicker.js');
    const file = await readFile(filePath, {encoding: 'utf8'});
    const gZipedfile = await gzip(file);
    const sizeKb = Buffer.byteLength(gZipedfile) / 1024;
    const isSuccess = sizeKb <= desirableSize;

    console.log(`Size of JS gziped file is ${chalk[isSuccess ? 'green' : 'red'](sizeKb.toFixed(2))}KB`);
}

checkSize();
