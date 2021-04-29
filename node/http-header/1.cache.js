const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true);
  let filePath = path.join(__dirname, 'public', pathname);
  console.log(req.url);
  // res.setHeader('Cache-Control', 'no-Cache');
  res.setHeader('Cache-Control', 'max-age=10');
  // res.setHeader('Cache-Control', 'no-Store');


  fs.stat(filePath, function (err, statObj) {
    if (err) {
      res.statusCode = 404;
      res.end('NOT FOUND');
    } else {
      if (statObj.isFile()) {
        let content = fs.readFileSync(filePath);
        let etag = crypto.createHash('md5').update(content).digest('base64');

        if (req.headers['if-none-match'] === etag) {
          res.statusCode = 304;
          res.end();
        } else {

          res.setHeader('Etag', etag);
          res.setHeader('Content-Type', mime.getType(filePath) + ';charst=utf-8');
          fs.createReadStream(filePath).pipe(res);
        }
        // res.setHeader('Content-Type', mime.getType(filePath) + ';charst=utf-8');
        // fs.createReadStream(filePath).pipe(res);
      } else {
        htmlPath = path.join(filePath, 'index.html');
        fs.access(htmlPath, function (err) {
          if (err) {
            res.statusCode = 404;
            res.end('NOT FOUND')
          } else {
            res.setHeader('Content-Type', 'text/html;charst=utf-8');
            fs.createReadStream(htmlPath).pipe(res);
          }
        });
      }
    }
  })
})

server.listen(8080, () => {
  console.log('server start 8080');
})