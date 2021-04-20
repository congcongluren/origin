let net = require('net');
let server = net.createServer(function(socket){
  socket.on('data', function (data) {
    console.log(data.toString());
    socket.write('server: hollo!')
  })
  socket.on('end',function () {
    console.log('客户端关闭');
  })
});
server.on('error', function (err) {
  console.log(err);
})
server.listen(8080,'localhost',function(){
    console.log('服务器开始监听');
});