const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value
        this.status = FULFILLED;

        // 事件发布
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    }
    
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED;
        
        // 事件发布
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) { // onFulfilled onRejected
    if (this.status === PENDING) {
      // then是异步调用
      this.onResolvedCallbacks.push(() => { // 切片编程

        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => { // 切片编程

        onRejected(this.value);
      });
    }


    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}

module.exports = Promise;