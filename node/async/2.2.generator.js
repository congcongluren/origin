function* read(val) {
  console.log(val);  // origin

  var a = yield "g1";
  console.log('a',a); // a 2
  var b = yield "g2";
  console.log('b',b); // b 3
  var c = yield "g3";
  console.log('c',c); // c 4
}


let it = read('origin');
console.log(it);           // Object [Generator] {}
console.log(it.next('1')); // { value: 'g1', done: false }
console.log(it.next('2')); // { value: 'g2', done: false }
console.log(it.next('3')); // { value: 'g3', done: false }
console.log(it.next('4')); // { value: undefined, done: true }
console.log(it.next('5')); // { value: undefined, done: true }
console.log(it.next('6')); // { value: undefined, done: true }
console.log(it.next('7')); // { value: undefined, done: true }



var _marked = /*#__PURE__*/regeneratorRuntime.mark(read);

function read(val) {
  var a, b, c;
  return regeneratorRuntime.wrap(function read$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(val);
          _context.next = 3;
          return "g1";

        case 3:
          a = _context.sent;
          console.log('a', a);
          _context.next = 7;
          return "g2";

        case 7:
          b = _context.sent;
          console.log('b', b);
          _context.next = 11;
          return "g3";

        case 11:
          c = _context.sent;
          console.log('c', c);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * regeneratorRuntime 对象，有mark方法，wrap方法
 * wrap的参数是个迭代器函数
 * 迭代器函数接收一个上下文参数
 * 上下文对象里面有prev，next，sent，stop（）
 * wrap方法返回一个带有next方法的对象
 * next方法返回yield后面的值，以及迭代是否完成的标识
*/



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
 * @param {*} it 传个generator进来
 * @returns 
 */
function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      let { value, done } = it.next(data); // 调用generator的next方法；
      if (done) { // 是否执行到最后一个next。
        resolve(value); // 是的话，直接返回最终结果
      } else {
        Promise.resolve(value).then(next,reject); // 不是的话，判断是否是promise，递归调用，失败就reject
      }
    }

    next(); // 开个调用的头
  })
}