const fs = require('fs');

const ReadStream = require('./ReadStream');

let timer;



let rs = new ReadStream('./a.txt', {
  flags: 'r',
  encoding: null,
  autoClose: true,
  emitClose: true,
  start: 0,
  // end: 4,
  highWaterMark: 3
})

rs.on('open', function(fd) {
  console.log('open',fd);
})

rs.on('data', function(chunk) {
  console.log(chunk);
  rs.pause();
})

rs.on('end', function() {
  console.log('end');
})

rs.on('close', function () {
  console.log('close');
  clearInterval(timer);
})

rs.on('error', function (err) {
  console.log(err, 'err');
  clearInterval(timer);
})

timer = setInterval(() => {
  rs.resume();
}, 1000)