const http = require('http');
const url = require('url')

const server = http.createServer((req,res)=>{
  console.log('client come on');
  console.log(req.method);
  console.log(req.url);
  console.log(url.parse(req.url, true));
  console.log(req.headers);

  let chunk=[];
  req.on('data', function(data) {
    Buffer.concat([])
    chunk.push(data);
    console.log(data);
  })

  req.on('end', function() {
    console.log(Buffer.concat(chunk).toString());
  })


  res.statusCode = 333;
  res.statusMessage = 'my define';
  res.setHeader('MyHeader', 1);
  res.write('hello');
  res.end('ok');
});
// server.on('request', function(req,res) {
//   console.log('client come on');
// })

server.listen(3000, function() {
  console.log('server start 3000');
});