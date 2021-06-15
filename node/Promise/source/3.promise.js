const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// 利用x的值来判断是调用promise2的resolve还是reject
function resolvePromise(promise2, x, resolve, reject) {
  // 核心流程
  if (promise2 === x) { // 返回的promise
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }


  // 自己写的promise要和其他人写的promise兼容
  if (typeof x === 'object' && x !== null || typeof x === 'function') {
    // 别人写的promise 调用成功后，可能还嗲用失败
    let called = false;
    try {
      let then = x.then; // 有可能then方法是通过defineProperty实现的， 取值可能会异常
      if (typeof then === 'function') {
        // 认为是promise
        then.call(x, y => {
          if (called) return;
          called = true
          // resolve(y);
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true
          reject(r);
        })
      } else {
        if (called) return;
        called = true
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else { // 返回普通值
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {

      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }


      if (this.status === PENDING) {
        this.value = value
        this.status = FULFILLED;

        // 事件发布
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {

      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED;

        // 事件发布
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) { // onFulfilled onRejected

    // 没传函数，参数穿透
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : res => res
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
      throw err
    }

    // 用于链式调用
    let promise2 = new Promise((resolve, reject) => {

      if (this.status === FULFILLED) {
        setTimeout(() => { // 开启异步调用关键

          try {
            let x = onFulfilled(this.value);

            // x 可能是promise，then的返回值
            // x 的值决定调用promise2的resolve还是reject
            resolvePromise(promise2, x, resolve, reject);

            // resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {

          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
            // resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // ------------------then是异步调用-----------------
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => { // 切片编程
          setTimeout(() => {

            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
              // resolve(x);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => { // 切片编程
          setTimeout(() => {

            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
              // resolve(x);
            } catch (e) {
              reject(e);
            }
          }, 0);

        });
      }

    })

    return promise2;
  }


  static resolve(val) {
    return new Promise((resolve, reject) => {
      resolve(val)
    })
  }
  static reject(val) {
    return new Promise((resolve, reject) => {
      reject(val)
    })
  }

  catch (errorFn) {
    return this.then(null, errorFn)
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let result = [];
      let times = 0

      const processSuccess = (index, val) => {
        result[index] = val;
        if (++times === promises.length) {
          resolve(result);
        }
      }

      for (let i = 0; i < promises.length; i++) {
        const p = promises[i];
        if (promises && typeof p.then === 'function') {
          p.then((data) => {
            processSuccess(i, data)
          }, reject)
        } else {
          processSuccess(i, p)
        }
      }


    })
  }
}

module.exports = Promise;