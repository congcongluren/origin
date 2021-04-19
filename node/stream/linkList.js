const { reverse } = require("dns");

class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  _node(index) { // 获取指定位置的节点
    let current = this.head;


    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }
  add(index, element) {
    /**
     *  创造一个节点
     *  让这个节点的next指向前一个人的next
     *  让前一个人的next指向这个节点
     */

    if (arguments.length === 1) {
      element = index;
      index = this.size;
    }

    let head = this.head;
    if (index === 0) {
      this.head = new Node(element, head);
    } else {
      let prevNode = this._node(index - 1);
      prevNode.next = new Node(element, prevNode.next)
    }


    this.size++;
  }

  remove(index) {
    if (this.size === 0) return null;
    let removeNode;
    if(index === 0) {
      removeNode = this.head;
      if (removeNode !== null) {  
        this.head = this.head.next;
      }
    }else {
      let prevNode = this._node(index - 1);
      removeNode = prevNode.next;
      prevNode.next = prevNode.next.next;
    }
    this.size--;
    return removeNode && removeNode.element;

  }

  set() {

  }

  get() {

  }

  reverse() {
    let node = this.head;
    if (node ===null || node.next === null) return node;


    let newHead = null;
    while(node !== null){
      let temp = node.next;
      node.next = newHead;
      newHead = node;
      node = temp;
    }

    this.head = newHead;
    return newHead;
  }

  reverse1() {
    function r(node) {
      if (node === null || node.next === null) return node;

      let newHead =  r(node.next);
      node.next.next = node;
      node.next = null;
      return newHead;
    }
    this.head = r(this.head);
  }

}

module.exports = LinkList;


// let ll = new LinkList();

// ll.add(1)
// ll.add(2)
// ll.add(3)
// ll.add(4)
// ll.add(5)

// ll.add(2, 100);

// let a = ll.remove(2);


// console.dir(ll, {
//   depth: 100
// });
// ll.reverse()

// console.dir(ll, {
//   depth: 100
// });