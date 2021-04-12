const fs = require('fs');
const path = require('path');

// fs.readFile(path.resolve(__dirname, 'package.json'), function (err, data) {
//   if (err) return console.log(err);
//   fs.writeFile('./aaaaa.json', data, function () {})

// });

const buff = Buffer.alloc(3);
fs.open(path.resolve(__dirname, 'number.js'), 'r', function(err, fd) {
  if (err) return console.log(err);
  fs.read(fd, buff, 0, 3, 6, function (err, data) {
    console.log(buff.toString());
  })
})