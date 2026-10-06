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
