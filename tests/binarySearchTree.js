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
