let p1 = new Promise((resolve, reject)=>{
  setTimeout(() => {
    resolve(1)
  }, 2000);
})
let p2 = new Promise((resolve, reject)=>{
  setTimeout(() => {
    reject(0)
  }, 1000);
})

Promise.race = function (arr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      if (p && typeof p.then === "function" ) {
        p.then(resolve, reject)
      } else {
        resolve(p)
      }
    }
  })
}

Promise.race([p2, p1]).then (res => {
  console.log(res );
}).catch(err => {
  console.log(err);
})