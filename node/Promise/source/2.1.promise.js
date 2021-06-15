const PENDING = "PENDING"; // 等待状态
const FULFILLED = "FULFILLED"; // 成功态
const REJECTED = "REJECTED"; // 失败态

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

        /**
         * 异步的then调用
        */
        if (this.status === PENDING) {
            // then是异步调用
            this.onResolvedCallbacks.push(() => { // 向成功的事件队列里面添加事件
                onFulfilled(this.value);
            });
            this.onRejectedCallbacks.push(() => { // 向失败的事件队列里面添加事件
                onRejected(this.value);
            });
        }

        /**
         * 同步的then调用
        */
        if (this.status === FULFILLED) { // 判断状态，成功态
            onFulfilled(this.value); // 调用用户传入的方法
        }

        if (this.status === REJECTED) { // 同理
            onRejected(this.reason);
        }
    }
}

module.exports = Promise;