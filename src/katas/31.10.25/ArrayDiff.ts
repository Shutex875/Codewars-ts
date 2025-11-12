/**
 * Your goal in this kata is to implement a difference function, which subtracts one list from another and returns the result.
 * It should remove all values from list a, which are present in list b keeping their order.
 * Examples:
 * arrayDiff([1,2], [1]) => [2]
 * arrayDiff([1,2,2,2,3], [2]) => [1,3]
 * arrayDiff([], [4,5]) => []
 * arrayDiff([1,2,3], [1,2]) => [3]
 */
export function arrayDiff(a: number[], b: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < a.length; i++) {
    if (!b.includes(a[i])) {
      result.push(a[i]);
    }
  }
  return result;
}
