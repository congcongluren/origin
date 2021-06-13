const PENDING = "PENDING"; // 等待状态
const FULFILLED = "FULFILLED"; // 成功态
const REJECTED = "REJECTED"; // 失败态


// 利用x的值来判断是调用promise2的resolve还是reject
function resolvePromise(promise2, x, resolve, reject) {
    // 核心流程
    if (promise2 === x) { // 判断promise和x是不是一个promise， 是的话会死循环
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    // 判断x的类型
    if (typeof x === 'object' && x !== null || typeof x === 'function') { // 有可能是promise
        try {
            let then = x.then; // 有可能then方法是通过defineProperty实现的， 取值可能会异常
            if (typeof then === 'function') { // 认为是promise
                // 调用then
                then.call(x, y => {
                    resolve(y);
                }, r => {
                    reject(r);
                })
            } else { // 返回普通值
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
    constructor(executor) {  // executor 是传入的函数，可以叫做执行函数
        this.status = PENDING; // 保存状态
        this.value = undefined; // 成功后保存的值
        this.reason = undefined; // 失败后保存的值

        this.onResolvedCallbacks = []; // 添加成功后的事件调用队列
        this.onRejectedCallbacks = []; // 添加失败后的事件调用队列

        /**
         *  我们在promise里面调用的resolve方法
         *  判断状态，保存值
        */
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                this.status = FULFILLED;

                // 成功事件调用
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }

        /**
         *  我们在promise里面调用的reject方法
         *  同理
        */
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED;

                // 失败事件调用
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        /**
         * executor是用户传入的方法，有可能发生异常，这里捕获异常
        */
        try {
            executor(resolve, reject); // 调用用户传入的Promise的参数
        } catch (err) {
            reject(err)
        }
    }

    /**
     * then方法，参数可选，第一个成功的调用，第二个失败的调用
     * 这里假设 onFulfilled onRejected 方法都会传入
    */
    then(onFulfilled, onRejected) {
        // 没传函数，参数穿透
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : res => res
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err;
        };

        let promise2 = new Promise((resolve, reject) => {
            /**
             * 成功态
            */
            if (this.status === FULFILLED) { // 判断状态，成功态
                setTimeout(() => { // 开启异步调用关键，微任务是语言本身提供的，使用定时器代替
                    try {
                        // 第一个then调用之后的结果x
                        let x = onFulfilled(this.value); // 调用用户传入的方法
                        // x 可能是promise，或者是then的返回值
                        // x 的值决定调用promise2的resolve还是reject
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }

            /**
             * 失败态
            */
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }

            // ------------------then是异步调用-----------------
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);

                });
            }

        })

        return promise2;
    }
}

module.exports = Promise;