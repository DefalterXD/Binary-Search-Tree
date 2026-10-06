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


    // PRIVATE METHOD sort() to sort an array
    #sort(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < (arr.length - i - 1); j++) {
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
            let st = d.start, end = d.end;
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

    // METHOD includes(value) which check for contained value and return boolean
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
    
    // METHOD insert(value) for inserting a new value into the tree
    insert(value) {
        let curr = this.root;

        if (curr === null) {
            return new Node(value);
        }
        while (curr !== null) {
            if (curr.data === value) {
                return;
            } else if (curr.left === null && curr.right === null && curr.data !== null) {
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

    // METHOD deleteItem(value) to delete the value in tree
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

}