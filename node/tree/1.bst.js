class Node {
  constructor(element, parent) {
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
      return;
    }

    let currentNode = this.root;
    let parent;
    let compare;
    while (currentNode) {
      compare = currentNode.element < element;
      parent = currentNode;

      if (compare) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    let node = new Node(element, parent);
    if (compare) {
      parent.right = node;
    } else {
      parent.left = node;
    }
  }

  preorderTraversal() {
    function traversal(node) {
      if (node === null) return;
      console.log(node.element);
      traversal(node.left);
      traversal(node.right);
    }
    traversal(this.root);
  }
  inorderTraversal() {
    function traversal(node) {
      if (node === null) return;
      traversal(node.left);
      console.log(node.element);
      traversal(node.right);
    }
    traversal(this.root);
  }
  postorderTraversal() {
    function traversal(node) {
      if (node === null) return;
      traversal(node.left);
      traversal(node.right);
      console.log(node.element);
    }
    traversal(this.root);
  }
  levelOrderTraversal(cb) {
    let stack = [this.root];
    let index = 0;
    let currentNode;
    while (currentNode = stack[index++]) {
      cb(currentNode)
      if (currentNode.left) {
        stack.push(currentNode.left);
      }

      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    }

  }

  reverse(cb) {
    let stack = [this.root];
    let index = 0;
    let currentNode;
    while (currentNode = stack[index++]) {
      let temp = currentNode.left;
      currentNode.left = currentNode.right;
      currentNode.right = temp;
      if (currentNode.left) {
        stack.push(currentNode.left);
      }

      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    }

  }
}


let tree = m = new Tree();
[10, 8, 19, 34, 67, 32, 36, 98].forEach(item => {
  tree.add(item)
})





// tree.preorderTraversal();
// tree.inorderTraversal();
// tree.postorderTraversal();
// tree.levelOrderTraversal((node) => {
//   node.element *= 2
// });
tree.reverse();

console.dir(tree, {
  depth: 1000
});