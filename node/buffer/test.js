function foo1() {
  console.error('foo1');

  for (let i = 0; i < 1000000000; i++) {
    
  }

  setTimeout(() => {
    console.log('foo11');
  }, 0);
}

function foo2() {
  console.error('foo2');
  setTimeout(() => {
    console.log('foo21');
  }, 0);
}

setTimeout(foo2, 0);
process.nextTick(foo1);
console.error('bar');