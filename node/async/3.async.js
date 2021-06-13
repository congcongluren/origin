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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg); var value = info.value;
  } catch (error) {
    reject(error); return;
  }
  if (info.done) {
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
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function read(_x) {
  return _read.apply(this, arguments);
}

function _read() {
  _read = _asyncToGenerator(
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