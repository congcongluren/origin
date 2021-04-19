let LinkList = require('./linkList');


class Queue{
  constructor() {
    this.ll = new LinkList();
  }
  offer(element) { // 添加
    this.ll.add(element);
  }
  poll() { // 删除头部
    let removeNode = this.ll.remove(0);
    return removeNode;
  }
}


let queue= new Queue();
module.exports = Queue;