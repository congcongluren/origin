const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true);
  // res.setHeader('Access-Control-Allow-Origin', '*')
  
  console.log(pathname);
  
  // if (req.headers.origin) {
  //   console.log(req.headers);
    

  //   res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  //   res.setHeader("Access-Control-Allow-Headers", "content-type,token");
  //   res.setHeader("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST,OPTIONS");
  //   res.setHeader("Access-Control-Allow-Credentials", true);
  //   res.setHeader("Access-Control-Max-Age", '10');


  //   if (req.method === 'OPTIONS') {
  //     //试探性请求
  //     return res.end();
  //   }
    
  // }

  // 客户端发送请求，接收数据
  // 后端 路由 ， 请求方法  =》处理
  
  if (pathname === '/login' && req.method === 'POST') {
    const buffer = [];
    req.on('data', function (chunk) {
      buffer.push(chunk);
    })

    req.on('end', function () {
      let buf = Buffer.concat(buffer);
      // res.setHeader('set-cookie', 'a=1');
      if (req.headers['content-type'] === 'application/json') {
        let obj = JSON.parse(buf.toString());
        res.end(JSON.stringify(obj));
      } else if (req.headers['content-type'] === 'text/plain') {
        res.end(buf.toString());
      } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let r = querystring.parse(buf.toString(), '&', '=');
        // console.log(querystring.parse(buf.toString(), '&', '='));
        res.end(JSON.stringify(r));
      }else {
        console.log(buf.toString());
        

        res.end('ok')
      }
    })
  } else {
    let filePath = path.join(__dirname, pathname);

    fs.stat(filePath, function (err, statObj) {
      if (err) {
        res.statusCode = 404;
        res.end('NOT FOUND');
      } else {
        if (statObj.isFile()) {
          res.setHeader('Content-Type', mime.getType(filePath) + ';charst=utf-8');
          fs.createReadStream(filePath).pipe(res);
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
  }
})

server.listen(3000, () => {
  console.log('server start 3000');
})