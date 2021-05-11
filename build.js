const {exec} = require('child_process');
const path = require('path');
const util = require('util');
const execAsync = util.promisify(exec);
const chalk = require('chalk');
const glob = require('glob');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

let srcPath = path.resolve('./src');
let distPath = path.resolve('./dist');



async function run() {

}

