// let Promise = require('./source/3.promise')

const {
  resolve,
  reject
} = require("./source/3.promise");
const Promise = require("./source/3.promise");

// Promise.reject(new Promise((resolve, reject)=>{
//   resolve(200)
// })).then(data=>{
//   console.log(data);
// }).catch(err=>{
//   console.log(err, 'err');
// })



Promise.all([1, 2, 3, new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  }, 1000)
}), new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('失败')
  }, 1000);
})]).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err, 'err');
})