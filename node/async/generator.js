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
console.log(it.next('1')); // { value: '1', done: false }
console.log(it.next('2')); // { value: '1', done: false }
console.log(it.next('3')); // { value: '1', done: false }
console.log(it.next('4')); // { value: '1', done: false }
console.log(it.next('5')); // { value: '1', done: false }
console.log(it.next('6')); // { value: '1', done: false }
console.log(it.next('7')); // { value: '1', done: false }



// var _marked = /*#__PURE__*/regeneratorRuntime.mark(read);

// function read(val) {
//   var a, b, c;
//   return regeneratorRuntime.wrap(function read$(_context) {
//     while (1) {
//       switch (_context.prev = _context.next) {
//         case 0:
//           console.log(val);
//           _context.next = 3;
//           return "g1";

//         case 3:
//           a = _context.sent;
//           console.log('a', a);
//           _context.next = 7;
//           return "g2";

//         case 7:
//           b = _context.sent;
//           console.log('b', b);
//           _context.next = 11;
//           return "g3";

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
