const {exec} = require('child_process');
const path = require('path');
const util = require('util');
const execAsync = util.promisify(exec);
const chalk = require('chalk');
const glob = require('glob');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const rimraf = require('rimraf');
const copyPackageFiles = require('./copyPackageFiles');

let babelConfig = path.resolve(__dirname, '../babel.config.js');
let srcPath = path.resolve('./src');
let distPath = path.resolve('./dist');

let log = {
    error(msg) {
        console.log(chalk.red(msg));
    },
    success(msg) {
        console.log(chalk.green(msg));
    },
    info(msg) {
        console.log(chalk.black(chalk.bgCyanBright(msg)));
    }
};

async function run() {
    log.info('Build started');

    rimraf.sync(distPath);
    fs.mkdirSync(distPath);

    try {
        await execAsync('set NODE_ENV="production"&& webpack');
        log.success('Bundle compiled successfully');
    } catch (e) {
        log.error(`Bundle compilation error: ${e}`);
    }

    try {
        await execAsync(`babel ${srcPath}/locale --out-dir ${distPath}/locale --config-file ${babelConfig}`);
        log.success('Localization files compiled');
    } catch (e) {
        log.error('Error, while handling localization files');
    }

    try {
        await copyPackageFiles();
        log.success('Package files are copied');
    } catch (e) {
        log.error(`Error, while copying package files: ${e}`);
    }

    try {
        await writeFile(
            path.join(distPath, 'index.es.js'), 
            'import AirDatepicker from \'./air-datepicker\';\nexport default AirDatepicker'
        );
    } catch (e) {
        log.error('Could not create ES index file');
    }
}

run();
