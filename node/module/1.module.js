let a = 100;
new Function('b', 'console.log(b)') ('b');
const vm = require('vm');

vm.runInThisContext(`console.log(a)`)
vm.runInNewContext(`console.log(a)`)