const fs = require('fs');
const { resolve } = require('path');
const Promise = require('./source/3.promise');

function readFile(filePath, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) return reject(err);
      resolve(data)
      // reject('eeeee')
    })
  })
}



// readFile('./a.txt', 'utf8')

//   .then((data) => {
//     console.log(data);
//   }, (err) => {
//     console.log('error',err);
//     return err
//   })

//   .then(res => {
//     console.log('success',res);
//   }, () => {
//     console.log('file');
//   })
let p;

let promise2 = new Promise((resolve, reject) =>{
  resolve(1)
  // reject(1)
}).then(data=>{
  p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('okokokokoko');
      resolve('ok')
    }, 1000)
  })
  return p
}, err=>{
  console.log(err);
  return 'xx'
})

promise2.then(data=>{
  console.log(data);
  return '222'
}, err=>{
  console.log('error', err);
}).then(data=>{
  console.log(data, 'p2, then2');
}).then(data=>{
  console.log(data, 'p2, then3');
})



// fs.readFile('./a.txt', 'utf8', function(err, data) {
//   fs.readFile('./b.txt', 'utf8', function (err, data)  {
//     console.log(data);
//   })
// })