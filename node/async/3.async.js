// async function read(val) {
//   console.log(val);  // origin

//   var a = await "g1";
//   console.log('a', a); // a 2
//   var b = await "g2";
//   console.log('b', b); // b 3
//   var c = await "g3";
//   console.log('c', c); // c 4
// }

let regeneratorRuntime = {
  mark(genFn) {
    return genFn
  },
  wrap(iteratorFn) {
    const context = {
      prev: 0,
      next: 0,
      done: false,
      stop() {
        this.done = true;
      }
    }

    let it = {};

    it.next = function (v) {
      context.sent = v;
      let value = iteratorFn(context);
      return {
        value,
        done: context.done
      }
    }


    return it;
  }
}

/**
 * 
 * @param {*} gen 迭代器
 * @param {*} resolve promise的
 * @param {*} reject promise的
 * @param {*} _next 
 * @param {*} _throw 
 * @param {*} key 
 * @param {*} arg 上一次next的返回值
 * @returns 
 */
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg); var value = info.value; // 主要是，调用next方法，得到返回值是个对象，next的返回值
  } catch (error) {
    reject(error); return;
  }
  if (info.done) { // 判断next是否执行完
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
/**
 * 
 * @param {*} fn // 迭代器的外层
 */
function _asyncToGenerator(fn) {
  return function () {
    var self = this, args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args); // 调用wrap方法 得到一个带有next方法的对象

      function _next(value) {
        // 主要传入了迭代器，promise的 resolve, reject
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) { // 错误处理，不考虑这个
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function read(_x) {  // 函数入口
  return _read.apply(this, arguments);
}

function _read() {
  _read = _asyncToGenerator( // 
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(val) {
      var a, b, c;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(val); // origin

              _context.next = 3;
              return "g1";

            case 3:
              a = _context.sent;
              console.log('a', a); // a 2

              _context.next = 7;
              return "g2";

            case 7:
              b = _context.sent;
              console.log('b', b); // b 3

              _context.next = 11;
              return "g3";

            case 11:
              c = _context.sent;
              console.log('c', c); // c 4

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _read.apply(this, arguments);
}


read("ORIGIN");