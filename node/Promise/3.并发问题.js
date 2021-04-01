const fs = require('fs');

// let arr = [];
// function out() {
//   if (arr.length === 2) {
//     console.log(arr);
//   }
// }

function atfer(times, callback) {
  let arr = [];
  return (data) => {
    arr.push(data)
    if (--times === 0) {
      callback(arr)
    }
    
  }
}

let out = atfer(2, (arr)=>{
  console.log(arr);
});

fs.readFile('./a.txt','UTF8', function(err, data) {
  // arr.push(data);
  out(data);
});
fs.readFile('./b.txt','UTF8', function(err, data) {
  // arr.push(data)
  out(data);
});


