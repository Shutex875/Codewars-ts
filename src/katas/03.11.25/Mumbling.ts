/**
 * This time no story, no theory. The examples below show you how to write function accum:
 * Examples:
 * accum("abcd") -> "A-Bb-Ccc-Dddd"
 * accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
 * accum("cwAt") -> "C-Ww-Aaa-Tttt"
 * The parameter of accum is a string which includes only letters from a..z and A..Z.
 * Each character is repeated based on its position (0-indexed), first letter uppercase followed by lowercase.
 */
export function accum(s: string): string {
  const result: string[] = [];
  for (let i = 0; i < s.length; i++) {
    let part = s[i].toUpperCase();
    part += s[i].toLowerCase().repeat(i);
    result.push(part);
  }
  return result.join("-");
}
