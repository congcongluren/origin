let Promise = require('./source/1.promise');

let promise = new Promise((resolve, reject) => {
  console.log('promise');
  // reject('error');
  resolve('cheng');

  // throw new Error('error')
})


promise.then((val)=>{
  console.log(val);
  console.log('success');
}, (reason) => {
  console.log(reason);
  console.log('err');
})