const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const port = 3000;

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use('*', function (req, res, next) {
    var filename = path.join(compiler.outputPath,'index.html');

    compiler.outputFileSystem.readFile(filename, function(err, result){
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(result);
        res.end();
    });
});


app.listen(port, () => {console.log(`Dev server is running on port ${port}`);})
