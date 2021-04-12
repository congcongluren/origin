const fs = require('fs');

// let ws = fs.createWriteStream('./b.txt', {
//   flags: 'w',
//   encoding: 'utf-8',
//   autoClose: true,
//   start: 0,
//   highWaterMark: 3, // 期待写入的字节数，超过，不影响写入
// })

// ws.on('open',function(fd) {
//   console.log('open', fd);
// })
// ws.on('close', function () {
//   console.log('close');
// })

// let flag = ws.write('1');
// console.log(flag);
// flag = ws.write('2');
// console.log(flag);
// flag = ws.write('3');
// console.log(flag);
// flag = ws.write('4');
// console.log(flag);
// flag = ws.write('5');
// console.log(flag);
// flag = ws.write('6');
// console.log(flag);
// flag = ws.write('7');
// console.log(flag);

// ws.end();


const  rs = fs.createReadStream('./a.txt', {
  highWaterMark: 3
})

const ws = fs.createWriteStream('./b.txt', {
  highWaterMark: 2
})

rs.on('data', function(data) {
  let flag = ws.write(data);
  if (!flag) {
    console.log('pause');
    rs.pause();
  }
})

ws.on('drain', function() {
  console.log('over');
  rs.resume();
})