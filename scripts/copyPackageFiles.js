const path = require('path');
const fs = require('fs');

let srcPath = path.resolve('.');
let distPath = path.resolve('./dist');

let files = ['package.json', 'README.md'];
module.exports = () => {
    let promises = files.map((fileName) => {
        return new Promise(((resolve, reject) => {
            fs.copyFile(
                path.resolve(srcPath, fileName),
                path.resolve(distPath, fileName),
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

