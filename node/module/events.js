const Events = require('events');
const util = require('util');

function People() {

}


util.inherits(People, Events)

// function create(proto) {
//   function Fn() {}
//   Fn.prototype = proto
//   return new Fn();
// }

// People.prototype.__proto__ = Events.prototype;
// Object.setPrototypeOf(People.prototype, Events.prototype);
// People.prototype = Object.create(Events.prototype);