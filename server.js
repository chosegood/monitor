var http = require('http'),
  fs = require('fs'),
  path = require('path'),
  mime = require('mime'),
  cache = {};

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: response not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead('Content-Type',
    mime.lookup(path.basename(filePath))
  );
  response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    path.exists(absPath, function (exists) {
      if (exists) {
        fs.readFile(absPath, function (err, data) {
          cache[absPath] = data;
          sendFile(response, absPath, data);
        });
      } else {
        send404(response);
      }
    });
  }
}

var server = http.createServer(function (request, response) {
  var filePath = false;

  if (request.url == '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + request.url;
  }

  if (!filePath) {
    send404(response);
  } else {
    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);
  }

});

server.listen(1337, function (listening) {
  console.log('Server listening on port 1337.');
});