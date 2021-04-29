const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.resolve(__dirname, '1.txt'));


zlib.gzip(content, function (err, data) {
  console.log(data);
  
})