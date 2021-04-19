class Node {
  constructor(element, parent) {
    super();
    this.element = element;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor() {
    this.root = null;
  }
  add(element) {
    if (this.root === null) {
      this.root = new Node(element);
    }

    // 左右分开
  }
}


let tree = m = new Tree();
[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach(item => {
  tree.add(item)
})