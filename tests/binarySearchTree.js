class Queue {
  constructor() {
    this.items = [];
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(element) {
    this.items[this.tailIndex] = element;
    this.tailIndex++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    let el = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return el;
  }

  isEmpty() {
    return this.tailIndex === this.headIndex;
  }

  size() {
    return this.tailIndex - this.headIndex;
  }
}

class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Data {
  constructor(node, start, end) {
    this.node = node;
    this.start = start;
    this.end = end;
  }
}

export class Tree {
  // 'root' attribute which contains return value of buildTree()
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  unBalancedTree() {
    const treeC = new Node(10);
    treeC.left = new Node(20);
    treeC.right = new Node(30);
    treeC.left.left = new Node(40);
    treeC.left.right = new Node(60);
    treeC.left.right.right = new Node(80);

    this.root = treeC;
  }

  // PRIVATE METHOD sort() to sort an array
  #sort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        } else if (arr[j] === arr[j + 1]) {
          arr.splice(j, 1);
        }
      }
    }

    return arr;
  }

  // PRIVATE METHOD buildTree() and turn it into balanced tree
  #buildTree(arr) {
    arr = this.#sort(arr);
    if (arr.length === 0) return null;
    let n = arr.length;

    let mid = Math.floor((n - 1) / 2);
    let root = new Node(arr[mid]);

    let q = new Queue();
    q.enqueue(new Data(root, 0, n - 1));

    while (!q.isEmpty()) {
      let d = q.dequeue();
      let curr = d.node;
      let st = d.start,
        end = d.end;
      mid = Math.floor((st + end) / 2);

      if (st < mid) {
        let leftVal = Math.floor((st + mid - 1) / 2);
        let left = new Node(arr[leftVal]);
        curr.left = left;
        q.enqueue(new Data(left, st, mid - 1));
      }

      if (end > mid) {
        let rightVal = Math.floor((mid + 1 + end) / 2);
        let right = new Node(arr[rightVal]);
        curr.right = right;
        q.enqueue(new Data(right, mid + 1, end));
      }
    }

    return root;
  }

  includes(value) {
    let curr = this.root;
    while (curr !== null) {
      if (curr.data === value) {
        return true;
      } else if (curr.data > value) {
        curr = curr.left;
      } else if (curr.data < value) {
        curr = curr.right;
      }
    }

    return false;
  }

  insert(value) {
    let curr = this.root;

    if (curr === null) {
      return new Node(value);
    }
    while (curr !== null) {
      if (curr.data === value) {
        return;
      } else if (
        curr.left === null &&
        curr.right === null &&
        curr.data !== null
      ) {
        break;
      } else if (curr.data > value && curr.left !== null) {
        curr = curr.left;
      } else if (curr.data < value && curr.right !== null) {
        curr = curr.right;
      }
    }

    if (curr.data > value) {
      curr.left = new Node(value);
    } else if (curr.data < value) {
      curr.right = new Node(value);
    }
  }

  #getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }

    return curr;
  }

  deleteItem(value) {
    const removeNode = (node, value) => {
      if (node === null) {
        return null;
      }

      if (node.data > value) {
        node.left = removeNode(node.left, value);
      } else if (node.data < value) {
        node.right = removeNode(node.right, value);
      } else {
        if (node.right === null) {
          return node.left;
        }

        if (node.left === null) {
          return node.right;
        }

        const curr = this.#getSuccessor(node, value);
        node.data = curr.data;
        node.right = removeNode(node.right, node.data);
      }

      return node;
    };

    this.root = removeNode(this.root, value);
  }
  // METHOD levelOrderForEach(callback) traverse the tree in breadth-first level
  // passing into callback values from nodes (not nodes themselves)
  // throw an Error that callback is required
  // Iteration
  // levelOrderForEach(callback) {
  //     if (!callback && !(callback instanceof Function)) {
  //         throw new Error('Please provide a callback!');
  //     }

  //     const root = this.root;

  //     if (!root) {
  //         return;
  //     }

  //     const q = new Queue();
  //     q.enqueue(root);

  //     while (!q.isEmpty()) {

  //         let curr = q.dequeue();
  //         if (curr.left !== null) {
  //             q.enqueue(curr.left);
  //         }
  //         if (curr.right !== null) {
  //             q.enqueue(curr.right);
  //         }
  //         callback(curr.data);
  //     }

  // }

  // Recursion
  levelOrderForEach(callback) {
    if (!callback && !(callback instanceof Function)) {
      throw new Error("Please provide a callback!");
    }

    const root = this.root;
    const q = new Queue();
    q.enqueue(root);

    const levelOrder = (queue) => {
      if (queue.isEmpty()) {
        return;
      }

      let curr = queue.dequeue();
      callback(curr.data);

      if (curr.left !== null) {
        queue.enqueue(curr.left);
      }
      if (curr.right !== null) {
        queue.enqueue(curr.right);
      }
      levelOrder(queue);
    };

    levelOrder(q);
  }

  preOrderForEach(callback) {
    if (!callback && !(callback instanceof Function)) {
      throw new Error("Please provide a callback!");
    }

    const root = this.root;
    const preOrder = (node) => {
      if (node === null) return;
      callback(node.data);
      preOrder(node.left);
      preOrder(node.right);
    };

    preOrder(root);
  }

  inOrderForEach(callback) {
    if (!callback && !(callback instanceof Function)) {
      throw new Error("Please provide a callback!");
    }

    const root = this.root;
    const inOrder = (node) => {
      if (node === null) return;
      inOrder(node.left);
      callback(node.data);
      inOrder(node.right);
    };

    inOrder(root);
  }

  postOrderForEach(callback) {
    if (!callback && !(callback instanceof Function)) {
      throw new Error("Please provide a callback!");
    }

    const root = this.root;
    const postOrder = (node) => {
      if (node === null) return;
      postOrder(node.left);
      postOrder(node.right);
      callback(node.data);
    };

    postOrder(root);
  }

  height(value) {
    const height = { value: -1 };
    const root = this.root;
    const getHeight = (root, height, value) => {
      if (!root) return -1;

      const leftHeight = getHeight(root.left, height, value);
      const rightHeight = getHeight(root.right, height, value);

      const ans = Math.max(leftHeight, rightHeight) + 1;

      if (root.data === value) height.value = ans;

      return ans;
    };

    getHeight(root, height, value);

    if (height.value === -1) {
      return undefined;
    }

    return height.value;
  }

  depth(value) {
    let root = this.root;
    let depth = 0;
    while (root !== null) {
      if (root.data === value) {
        return depth;
      } else if (root.data < value) {
        root = root.right;
        depth++;
      } else if (root.data > value) {
        root = root.left;
        depth++;
      }
    }

    if (depth === 0) {
      return undefined;
    }
  }

  #maxHeight(node) {
    if (node === null) return 0;
    return (
      1 + Math.max(this.#maxHeight(node.left), this.#maxHeight(node.right))
    );
  }

  isBalanced() {
    const root = this.root;

    const getBalanceResult = (root) => {
      if (root === null) return true;

      const leftHeight = this.#maxHeight(root.left);
      const rightHeight = this.#maxHeight(root.right);

      const heightDiff = Math.abs(leftHeight - rightHeight);

      if (heightDiff > 1) return false;

      return getBalanceResult(root.left) && getBalanceResult(root.right);
    };

    return getBalanceResult(root);
  }

  rebalance() {
    const root = this.root;
    const newTree = [];

    if (this.isBalanced()) return;

    const preOrder = (node) => {
      if (node === null) return;
      newTree.push(node.data);
      preOrder(node.left);
      preOrder(node.right);
    };

    preOrder(root);

    this.root = this.#buildTree(newTree);
  }
}
