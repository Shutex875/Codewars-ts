/**
 * Your task is to sum the differences between consecutive pairs in the array in descending order.
 * Example:
 * [2, 1, 10]  -->  9
 * In descending order: [10, 2, 1]
 * Sum: (10 - 2) + (2 - 1) = 8 + 1 = 9
 * If the array is empty or contains only one element, return 0.
 */
export function sumOfDifferences(arr: number[]): number {
  if (arr.length <= 1) {
    return 0;
  }
  const sorted = arr.sort((a, b) => b - a);
  let sum = 0;
  for (let i = 0; i < sorted.length - 1; i++) {
    sum += sorted[i] - sorted[i + 1];
  }
  return sum;
}
