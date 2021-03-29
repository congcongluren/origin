const Promise = require('./source/3.promise');

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
}, err=>{
  console.log('error', err);
})
