const path = require('path');
const fs = require('fs');

let srcPath = path.resolve('.');
let distPath = path.resolve('./dist');

let files = ['package.json', 'README.md', ['src/datepicker.d.ts', 'air-datepicker.d.ts']];
module.exports = () => {
    let promises = files.map((fileName) => {
        return new Promise(((resolve, reject) => {
            let srcFileName = Array.isArray(fileName) ? fileName[0] : fileName;
            let distFileName = Array.isArray(fileName) ? fileName[1] : fileName;

            fs.copyFile(
                path.resolve(srcPath, srcFileName),
                path.resolve(distPath, distFileName),
                (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                }
            );
        }));
    });

    return Promise.all(promises);
};

