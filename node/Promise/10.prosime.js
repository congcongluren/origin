const Promise = require('./source/3.promise');
const fs = require('fs')
// let promise2 = new Promise((resolve, reject) =>{
//   resolve(1)
//   // reject(1)
// }).then(data=>{
//   p = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//       console.log('okokokokoko');
//       resolve('ok')
//     }, 1000)
//   })
//   return p
// }, err=>{
//   console.log(err);
//   return 'xx'
// })

// promise2.then(data=>{
//   console.log(data);
// }, err=>{
//   console.log('error', err);
// })



// function readFile(filePath, encoding) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, encoding, (err, data) => {
//       if (err) return reject(err);
//       resolve(data)
//       // reject('eeeee')
//     })
//   })
// }

// readFile('./a.txt', 'utf8').then(data=>{
//   console.log(data);
// })


let p = new Promise((resolve, reject) =>{
  resolve(new Promise((resolve, reject) => {
    resolve(100);
  }))
})

p.then(data => {
  console.log(data);
})