// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var comments = [];

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  if (pathname === "/") {
    pathname = "index.html";
  }
  if (pathname === "/index.html") {
    fs.readFile("index.html", function (err, data) {
      if (err) {
        console.log(err);
        res.writeHead(404, {"Content-Type": "text/html"});
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data.toString());
      }
      res.end();
    });
  } else if (pathname === "/comment") {
    var postData = "";
    req.setEncoding("utf8");
    req.addListener("data", function (postDataChunk) {
      postData += postDataChunk;
    });
    req.addListener("end", function () {
      var comment = qs.parse(postData).comment;
      comments.push(comment);
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Thanks for your comment!");
    });
  } else if (pathname === "/getComments") {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write(JSON.stringify(comments));
    res.end();
  } else {
    var extname = path.extname(pathname);
    fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
        console.log(err);
        res.writeHead(404, {"Content-Type": "text/html"});
      } else {
        res.writeHead(200, {"Content-Type": "text/" + extname.substr(1)});
        res.write(data.toString());
      }
      res.end();
    });
  }
}).listen(1337, "