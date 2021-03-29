class Subject{
  constructor (name) {
    this.name = name;
    this.state = '非常开心';
    this.observers = [];
  }
  attach(o) {
    this.observers.push(o);
  }
  setState(newState) {
    this.state = newState;
    this.observers.forEach(o=>o.update(this.name, newState))
  }
}

class Observer{
  constructor (name) {
    this.name = name;
  }
  update(s,state) {
    console.log(this.name + ":" + s + state);
  }
}

let s = new Subject('小宝宝');


let o1 = new Observer('f');
let o2 = new Observer('m');

s.attach(o1)
s.attach(o2)
s.setState('不开心了')
s.setState('开心了')