import { Tree } from "./binarySearchTree.js"

const arrA = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arrB = [1, 3, 5, 7];
const arrD = [10, 5, 15, 12, 18, 21];

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

describe('Test finding value in binary tree', () => {
    const tree = new Tree(arrA);

    test('Found in tree the value 4 and return "true"', () => {
        expect(tree.includes(4)).toBe(true);
    });

    test('Found in tree with the value 10 and return "false" ', () => {
        expect(tree.includes(10)).toBe(false);
    });
});

describe('Test insert value in binary tree', () => {
    const tree = new Tree(arrB);

    test('Insert number 2 into the tree', () => {
        tree.insert(2);
        expect(tree.root.left.right.data).toBe(2);
    });

    test('Insert number 6 into the tree', () => {
        tree.insert(6);
        expect(tree.root.right.right.left.data).toBe(6);
    });

    test('Insert number 5 into the tree to with nothing inserted', () => {
        expect(tree.insert(5)).toBe(undefined);
    });
});

describe('Test deletion of the value in binary tree', () => {
    const tree1 = new Tree(arrB);
    const tree2 = new Tree(arrB);
    const tree3 = new Tree(arrA);
    const tree4 = new Tree(arrD);

    test('Delete the value 7 with no child nodes in binary tree', () => {
        prettyPrint(tree1.root);
        tree1.deleteItem(7);
        prettyPrint(tree1.root);
    });

    test('Delete the value 5 with one child node in binary tree', () => {
        prettyPrint(tree2.root);
        tree2.deleteItem(5);
        prettyPrint(tree2.root);
    });

    test('Delete the value 67 with one child node in binary tree', () => {
        prettyPrint(tree3.root);
        tree3.deleteItem(67);
        prettyPrint(tree3.root);
    });

    test('Delete the value 15 with two child nodes in binary tree', () => {
        prettyPrint(tree4.root);
        tree4.deleteItem(12);
        prettyPrint(tree4.root);
    });
});

describe('Test levelOrderForEach of the values with callback', () => {
    const tree = new Tree(arrA);
    const log = { values: [] };

    const printEachTreeValue = (value) => {
        log.values.push(value);
    };

    test('Return undefined to trigger throw Error', () => {
        expect(() => tree.levelOrderForEach(undefined)).toThrow('Please provide a callback!');
    });

    test('Return console.log for loging each value', () => {
        tree.levelOrderForEach(printEachTreeValue);
        console.log(log.values);
        expect(log.values).toEqual([8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]);
    });
});

describe('Test preOrder of the values in binary tree', () => {
    const tree = new Tree(arrB);
    const log = { values: [] };

    const printEachTreeValue = (value) => {
        log.values.push(value);
    };

    test('Return console.log with preOrder order', () => {
        tree.preOrderForEach(printEachTreeValue);
        expect(log.values).toEqual([3, 1, 5, 7]);
    })
});
