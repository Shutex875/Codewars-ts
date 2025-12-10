/**
 * In a grid of 6 by 6 squares you want to place a skyscraper in each square with only some clues:
 * The height of the skyscrapers is between 1 and 6
 * No two skyscrapers in a row or column may have the same number of floors
 * A clue is the number of skyscrapers that you can see in a row or column from the outside
 * Higher skyscrapers block the view of lower skyscrapers located behind them
 * Can you write a program that can solve each 6 by 6 puzzle?
 * Example:
 * To understand how the puzzle works, this is an example of a row with 2 clues.
 * Seen from the left there are 6 buildings visible while seen from the right side only 1:
 *  6	  	  	  	  	  	  	 1
 * There is only one way in which the skyscrapers can be placed. From left-to-right
 * all six buildings must be visible and no building may hide behind another building:
 *  6	 1	 2	 3	 4	 5	 6	 1
 * If no clue is available, add value `0`
 * Each puzzle has only one possible solution
 * `SolvePuzzle()` returns matrix `int[][]`. The first indexer is for the row, the
 * second indexer for the column. Python returns a 6-tuple of 6-tuples, Ruby a 6-Array of 6-Arrays.
 */
function solvePuzzle(clues: number[]): number[][] {
  const N = 6;
  const allPerms = generatePermutations();
  const top = clues.slice(0, N);
  const right = clues.slice(6, 12);
  const bottom = clues.slice(12, 18).reverse();
  const left = clues.slice(18, 24).reverse();
  const rowPerms: number[][][] = [];
  for (let i = 0; i < N; i++) {
    rowPerms.push(
      allPerms.filter(
        (p) =>
          (left[i] === 0 || countVisible(p) === left[i]) &&
          (right[i] === 0 || countVisible([...p].reverse()) === right[i]),
      ),
    );
  }
  const colPerms: number[][][] = [];
  for (let j = 0; j < N; j++) {
    colPerms.push(
      allPerms.filter(
        (p) =>
          (top[j] === 0 || countVisible(p) === top[j]) &&
          (bottom[j] === 0 || countVisible([...p].reverse()) === bottom[j]),
      ),
    );
  }
  const grid: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
  const columns: number[][] = Array.from({ length: N }, () => []);
  function solve(rowIndex: number): boolean {
    if (rowIndex === N) return true;
    for (const perm of rowPerms[rowIndex]) {
      let valid = true;
      for (let j = 0; j < N; j++) {
        if (columns[j].includes(perm[j])) {
          valid = false;
          break;
        }
      }
      if (!valid) continue;
      for (let j = 0; j < N; j++) {
        const partial = [...columns[j], perm[j]];
        if (!isPrefixValid(partial, colPerms[j])) {
          valid = false;
          break;
        }
      }
      if (!valid) continue;
      for (let j = 0; j < N; j++) {
        columns[j].push(perm[j]);
        grid[rowIndex][j] = perm[j];
      }
      if (solve(rowIndex + 1)) return true;
      for (let j = 0; j < N; j++) {
        columns[j].pop();
      }
    }
    return false;
  }
  solve(0);
  return grid;
}
function generatePermutations(): number[][] {
  const result: number[][] = [];
  const arr = [1, 2, 3, 4, 5, 6];
  function permute(start: number) {
    if (start === arr.length) {
      result.push([...arr]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }
  permute(0);
  return result;
}
function countVisible(line: number[]): number {
  let count = 0;
  let max = 0;
  for (const height of line) {
    if (height > max) {
      count++;
      max = height;
    }
  }
  return count;
}
function isPrefixValid(partial: number[], perms: number[][]): boolean {
  for (const p of perms) {
    let match = true;
    for (let i = 0; i < partial.length; i++) {
      if (p[i] !== partial[i]) {
        match = false;
        break;
      }
    }
    if (match) return true;
  }
  return false;
}
