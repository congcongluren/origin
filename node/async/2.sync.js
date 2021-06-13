
// let regeneratorRuntime = {
//   mark(genFn) {
//     return genFn
//   },
//   wrap(iteratorFn) {
//     const context = {
//       prev: 0,
//       next: 0,
//       done: false,
//       stop() {
//         this.done = true;
//       }
//     }

//     let it = {};

//     it.next = function (v) {
//       context.sent = v;
//       let value = iteratorFn(context);
//       return {
//         value,
//         done: context.done
//       }
//     }


//     return it;
//   }
// }


// var _marked = /*#__PURE__*/regeneratorRuntime.mark(read);

// function read(val) {
//   var a, b, c;
//   return regeneratorRuntime.wrap(function read$(_context) {
//     while (1) {
//       switch (_context.prev = _context.next) {
//         case 0:
//           console.log(val);
//           _context.next = 3;
//           return 1;

//         case 3:
//           a = _context.sent;
//           console.log('a', a);
//           _context.next = 7;
//           return 2;

//         case 7:
//           b = _context.sent;
//           console.log('b', b);
//           _context.next = 11;
//           return 3;

//         case 11:
//           c = _context.sent;
//           console.log('c', c);

//         case 13:
//         case "end":
//           return _context.stop();
//       }
//     }
//   }, _marked);
// }

// var it = read('begin');
// {
//   let { value, done } = it.next('first next');
//   console.log(value, done);
// }

// {
//   let { value, done } = it.next('second next');
//   console.log(value, done);
// }

// {
//   let { value, done } = it.next('three next');
//   console.log(value, done);
// }

// {
//   let { value, done } = it.next('last next');
//   console.log(value, done);
// }

// it.next();
// it.next();














function* read(val) {
  console.log(val);

  var a = yield "1";
  console.log('a',a);
  var b = yield "2";
  console.log('b',b);
  var c = yield "3";
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






























// function co(it) {
//   return new Promise((resolve, reject) => {
//     function next(data) {
//       let { value, done } = it.next(data);
//       if (done) {
//         resolve(value);
//       } else {
//         Promise.resolve(value).then(next,reject);
//       }
//     }

//     next();
//   })
// }


// const util = require('util');
// const fs = require('fs');
// // // const co = require('co');

// let readFile = util.promisify(fs.readFile);

// function* read() {
//   let data = yield readFile('./a.txt', 'utf8');
//   data = yield readFile(data, 'utf8');

//   return data;
// }


// co(read()).then(data => {
//   console.log(data);

// }).catch(err => {
//   console.log(err);
  
// })


// let it = read();
// let {value, done} = it.next();


// value.then(data => {
//   console.log(data);
//   let {value, done} = it.next(data);

//   value.then(data => {
//     console.log(data);

//   })
// })


















// async function read() {
//   let data = await readFile('./a.txt', 'utf8');
//   data = await readFile(data, 'utf8');
//   return data;
// }

// read().then(res => {
//   console.log(res);
  
// }) 
