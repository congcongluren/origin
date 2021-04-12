const fs = require('fs');

function copy(source, target, cb) {
  const BUFFER_SIZE = 3;
  const buffer = Buffer.alloc(BUFFER_SIZE);
  let  r_offset = 0;
  let  w_offset= 0;
  fs.open(source, 'r', function (err, rfd) {
    fs.open(target, 'w', function (err, wfd) {


      function next () {
        fs.read(rfd, buffer, 0, BUFFER_SIZE, r_offset, function(err, bytesRead) {
          if (err) return cb(err);
          if (bytesRead) {
            fs.write(wfd, buffer, 0, bytesRead, w_offset, function (err, written) {
              r_offset += bytesRead;
              w_offset += written;
              next();
            })
          } else {
            fs.close(rfd, () => {});
            fs.close(wfd, () => {})
            cb();
          }
        })
      }
      next();



    })
  })

}





copy('./a.txt', './b.txt', function (err) {
  if (err) return console.log(err);
  console.log('copy success');
})