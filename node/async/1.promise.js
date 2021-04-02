const fs = require('fs');
const util = require('util');
const { resolve, reject } = require('../Promise/source/3.promise');
// Promise.prototype.finally = function(cb){
//   return this.then((res) => {
//     return Promise.resolve(cb()).then(() => res);
//   }, (err) => {
//     return Promise.resolve(cb()).then(() => {throw err});
//   })
// }

// let p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 2000);
// })
// let p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(0)
//   }, 1000);
// })

function promisify(readFile) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      readFile(...args, (err, data) => {
        if (err) reject(err);
        resolve(data)
      })
    })
  }
}

// let readFile = util.promisify(fs.readFile)
let readFile = promisify(fs.readFile)



readFile('./package.json', 'utf8').then(data => {
  console.log(data);
}, err => {
  console.log(err);
})










// Promise.allSettled = function (arr) {
//   return new Promise((resolve, reject) => {

//     let times = 0;
//     let result = []

//     function processSuccess(value, key, status) {
//       if (status === 'rejected') {
//         result[key] = {
//           status,
//           reason: value
//         }
//       } else {
//         result[key] = {
//           status,
//           value
//         }
//       }
//       if (++times === arr.length) {
//         resolve(result);
//       }
//     }

//     for (let i = 0; i < arr.length; i++) {
//       const p = arr[i];
//       if (p && typeof p.then === 'function') {
//         p.then(res => {
//           processSuccess(res, i, 'fulfilled');
//         }, err => {
//           processSuccess(err, i, 'rejected');
//         })
//       } else {
//         processSuccess(p, i, 'fulfilled')
//       }
//     }
//   })

// }


// Promise.allSettled([p1, p2, 456]).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.log(err);
// })






// p1.finally(() => {
//   console.log(111);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(1000)
//     }, 1000);
//   })
// }).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.log(err, 'err');
// })










// Promise.race = function (arr) {
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < arr.length; i++) {
//       const p = arr[i];
//       if (p && typeof p.then === "function" ) {
//         p.then(resolve, reject)
//       } else {
//         resolve(p)
//       }
//     }
//   })
// }

// // Promise.race([p2, p1]).then (res => {
// //   console.log(res );
// // }).catch(err => {
// //   console.log(err);
// // })



// function wrap (p1) {
//   let abort;
//   let p = new Promise((resolve, reject) => {
//     abort = reject;
//   });
//   let p2 = Promise.race([p, p1])
//   p2.abort = abort

//   return p2
// }
// let p2 = wrap(p1);

// p2.then(data => {
//   console.log(data);
// }, err => {
//   console.log(err);
// })


// setTimeout(() => {
//   p2.abort('超时')
// }, 1000);