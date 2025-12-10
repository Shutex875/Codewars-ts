/**
 * You are given a grid, which always includes exactly two end-points indicated by X
 * A line can have the following characters :
 * You simply need to return true/false if you can detect a one and only one "valid" line joining those points.
 * - = left / right
 * | = up / down
 * + = corner
 * Rules for valid lines
 * The most basic kind of valid line is when the end-points are already adjacent
 * X
 * X
 * XX
 * The corner character (+) must be used for all corners (but only for corners).
 * If you find yourself at a corner then you must turn.
 * It must be possible to follow the line with no ambiguity (lookahead of just one step, and never treading on the same spot twice).
 * The line may take any path between the two points.
 * Sometimes a line may be valid in one direction but not the other. Such a line is still considered valid.
 * Every line "character" found in the grid must be part of the line. If extras are found then the line is not valid.
 * Examples
 * Good lines
 * X---------X
 * X
 * |
 * |
 * X
 *    +--------+
 * X--+        +--+
 *                |
 *                X
 *    +-------------+
 *    |             |
 * X--+      X------+
 *    +-------+
 *    |      +++---+
 * X--+      +-+   X
 * Bad lines:
 * X-----|----X
 * X
 * |
 * +
 * X
 *    |--------+
 * X---        ---+
 *                |
 *                X
 *    +------
 *    |
 * X--+      X
 *       +------+
 *       |      |
 * X-----+------+
 *       |
 *       X
 * Hint
 * Imagine yourself walking a path where you can only see your very next step.
 * Can you know which step you must take, or not?
 */
function line(grid: string[]): boolean {
  const nonSpaces: [number, number][] = [];
  const Xs: [number, number][] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== " ") {
        nonSpaces.push([i, j]);
        if (grid[i][j] === "X") {
          Xs.push([i, j]);
        }
      }
    }
  }
  if (Xs.length !== 2) return false;
  const [A, B] = Xs;
  if (traverse(A, B, grid, nonSpaces)) return true;
  if (traverse(B, A, grid, nonSpaces)) return true;
  return false;
}
function traverse(
  start: [number, number],
  end: [number, number],
  grid: string[],
  nonSpaces: [number, number][],
): boolean {
  const visited = new Set<string>();
  let current: [number, number] = start;
  visited.add(stringify(current));
  let previous: [number, number] | null = null;
  while (!equal(current, end)) {
    const nexts = getNextDirections(current, previous, grid, visited);
    if (nexts.length !== 1) return false;
    const next = nexts[0];
    visited.add(stringify(next));
    previous = current;
    current = next;
  }
  for (const pos of nonSpaces) {
    if (!visited.has(stringify(pos))) return false;
  }
  return true;
}
function equal(a: [number, number], b: [number, number]): boolean {
  return a[0] === b[0] && a[1] === b[1];
}
function stringify(pos: [number, number]): string {
  return `${pos[0]},${pos[1]}`;
}
function getNextDirections(
  current: [number, number],
  previous: [number, number] | null,
  grid: string[],
  visited: Set<string>,
): [number, number][] {
  const [x, y] = current;
  const currentChar = grid[x][y];
  const directions: [number, number][] = [];
  let in_dx = 0,
    in_dy = 0;
  if (previous !== null) {
    in_dx = x - previous[0];
    in_dy = y - previous[1];
  }
  for (const [dx, dy] of [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || nx >= grid.length) continue;
    if (ny < 0 || ny >= grid[nx].length) continue;
    if (visited.has(stringify([nx, ny]))) continue;
    const nextChar = grid[nx][ny];
    if (nextChar === " ") continue;

    if (currentChar === "X") {
      if (dx === 0) {
        if (nextChar === "|") continue;
      } else {
        if (nextChar === "-") continue;
      }
    } else if (currentChar === "-") {
      if (dx !== 0) continue;
      if (nextChar === "|") continue;
    } else if (currentChar === "|") {
      if (dy !== 0) continue;
      if (nextChar === "-") continue;
    } else if (currentChar === "+") {
      if (in_dx === 0) {
        if (dx === 0) continue;
      } else if (in_dy === 0) {
        if (dy === 0) continue;
      }
      if (dx === 0) {
        if (nextChar === "|") continue;
      } else {
        if (nextChar === "-") continue;
      }
    }
    directions.push([nx, ny]);
  }
  return directions;
}
