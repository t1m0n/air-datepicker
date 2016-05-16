var static = require('node-static'),
    http = require('http');

var file = new static.Server('.');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(3000);
