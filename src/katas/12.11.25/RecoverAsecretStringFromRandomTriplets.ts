/**
 * There is a secret string which is unknown to you. Given a collection of
 * random triplets from the string, recover the original string.
 * A triplet here is defined as a sequence of three letters such that each
 * letter occurs somewhere before the next in the given string. "whi" is a triplet for the string "whatisup".
 * As a simplification, you may assume that no letter occurs more than once in the secret string.
 * You can assume nothing about the triplets given to you other than that they are valid triplets and that
 * they contain sufficient information to deduce the original string. In particular, this means that the
 * secret string will never contain letters that do not occur in one of the triplets given to you.
 */
function recoverSecret(triplets: string[][]): string {
  const graph: { [key: string]: Set<string> } = {};
  const inDeg: { [key: string]: number } = {};
  for (const triplet of triplets) {
    for (const char of triplet) {
      if (!graph[char]) {
        graph[char] = new Set();
        inDeg[char] = 0;
      }
    }
  }
  for (const triplet of triplets) {
    const [a, b, c] = triplet;
    if (!graph[a].has(b)) {
      graph[a].add(b);
      inDeg[b]++;
    }
    if (!graph[b].has(c)) {
      graph[b].add(c);
      inDeg[c]++;
    }
    if (!graph[a].has(c)) {
      graph[a].add(c);
      inDeg[c]++;
    }
  }
  const result: string[] = [];
  const queue: string[] = [];
  for (const char in inDeg) {
    if (inDeg[char] === 0) {
      queue.push(char);
    }
  }
  while (queue.length > 0) {
    queue.sort();
    const current = queue.shift()!;
    result.push(current);
    for (const neighbor of graph[current]) {
      inDeg[neighbor]--;
      if (inDeg[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  return result.join("");
}
