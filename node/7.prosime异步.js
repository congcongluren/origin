let Promise = require('./source/2.promise');

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('promise');
    resolve('cheng');
    // reject('error');
    // throw new Error('error')
  }, 1000)
})


promise.then((val) => {
  console.log('success', val);
}, (reason) => {
  console.log('err', reason);
})

promise.then((val) => {
  console.log('success', val);
}, (reason) => {
  console.log('err', reason);
})