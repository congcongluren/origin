const Promise = require('./source/3.promise');

let promise = new Promise((reoslve, reject) => {
  reoslve(1);
}).then(res => {
  console.log(res, 'first');
  return promise
}, err=>{
  console.log(err);
})

promise.then(res => {
  console.log(res, 'second');
}, err=>{
  console.log(err, 'second');
})