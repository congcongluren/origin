const fs = require('fs');
const path = require ('path');

fs.readFile(path.resolve(__dirname, 'package.json'), function (err, data) {
  if (err) return console.log(err);
});


fs.writeFile('./a.js', {a:1}, function () {
})