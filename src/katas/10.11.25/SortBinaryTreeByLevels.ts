/**
 * You are given a binary tree:
 * Your task is to return the list with elements from tree sorted by levels, which means the root element
 * goes first, then root children (from left to right) are second and third, and so on.
 * Return empty array if root is null.
 * Example 1 - following tree:
 *                  2
 *             8        9
 *           1  3     4   5
 * Should return following list:
 * [2,8,9,1,3,4,5]
 * Example 2 - following tree:
 *                  1
 *             8        4
 *               3        5
 *                          7
 * Should return following list:
 * [1,8,4,3,5,7]
 */
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function treeByLevels(root: TreeNode | null): number[] {
  if (!root) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode.value);

    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }

  return result;
}
