const fs = require('fs');
let arr = [];

let events = {
  _event: [],
  on(fn) {
    this._event.push(fn);
  },
  emit(data) {
    this._event.forEach(fn=>fn(data))
  }
}



events.on(()=>{
  console.log('读取一次');
})

events.on((data)=>{
  arr.push(data)
})

events.on((data) => {
  if (arr.length === 2) {
    console.log('读取完毕');
  }
})

fs.readFile('./a.txt','UTF8', function(err, data) {
  events.emit(data);
});
fs.readFile('./b.txt','UTF8', function(err, data) {
  events.emit(data);
});


