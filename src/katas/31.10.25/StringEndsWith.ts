/**
 * Complete the solution so that it returns true if the first argument (string)
 * passed in ends with the 2nd argument (also a string).
 *
 * Examples:
 * solution('abc', 'bc') => true
 * solution('abc', 'd') => false
 * solution('abcde', 'cde') => true
 * solution('abcde', 'abc') => false
 */
export function solution(str: string, ending: string): boolean {
  if (ending.length > str.length) return false;
  return str.substring(str.length - ending.length) === ending;
}
