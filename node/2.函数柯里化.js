// typeof 
// instanceof
// Object.prototype.toString.call
// constructor

// function isType(val, typing) {
//   return Object.prototype.toString.call(val) === `[object ${typing}]`
// }

// console.log(isType(123, 'string'));

function curring(fn) {
  let inner = (args = [])  => {
    return args.length >= fn.length ? fn(...args) : (...useArgs) => inner([...args, ...useArgs])
  }
  return inner();
}

function sum(a, b, c, d) {
  return a + b + c + d;
}

let sum1 = curring(sum);
let sum2 = sum1(1);
let sum3 = sum2(2, 3);
let result = sum3(4);


console.log(result);