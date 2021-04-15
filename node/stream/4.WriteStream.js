const fs = require('fs');
const path = require('path');
const WriteStream = require('./WriteStream');

const ws = new WriteStream(path.resolve(__dirname, './b.txt'), {
  highWaterMark: 4,

})

let i = 0;
function write() {
  let flag = true;
  while (i < 10 && flag) { 
    flag = ws.write(i++ + '');
    console.log(flag);
  }
}
ws.on('drain', function () {
  console.log('写完了');
  write();
})

write();