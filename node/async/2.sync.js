
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


var _marked = /*#__PURE__*/regeneratorRuntime.mark(read);

function read() {
  var a, b, c;
  return regeneratorRuntime.wrap(function read$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          a = _context.sent;
          console.log(a);
          _context.next = 6;
          return 2;

        case 6:
          b = _context.sent;
          console.log(b);
          _context.next = 10;
          return 3;

        case 10:
          c = _context.sent;
          console.log(c);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var it = read();
{
  let { value, done } = it.next('first next');
  console.log(value, done);
}

{
  let { value, done } = it.next('second next');
  console.log(value, done);
}

{
  let { value, done } = it.next('three next');
  console.log(value, done);
}

{
  let { value, done } = it.next('last next');
  console.log(value, done);
}

// it.next();
// it.next();














function* read(val) {
  console.log(val);
  
  var a = yield 1;
  console.log('a',a);
  var b = yield 2;
  console.log('b',b);
  var c = yield 3;
  console.log('c',c);
}


let it = read('origin');
it.next('1');
it.next('2');
it.next('3');
it.next('4');
it.next('5');
it.next('6');
it.next('7');