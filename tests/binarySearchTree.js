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

