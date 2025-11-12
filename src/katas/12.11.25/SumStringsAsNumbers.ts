/**
* Given the string representations of two integers, return the string representation of the sum of those integers.
* For example:
* sumStrings('1','2') // => '3'
* A string representation of an integer will contain no characters besides the ten numerals "0" to "9".
* I have removed the use of BigInteger and BigDecimal in java
* Python: your solution need to work with huge numbers (about a milion digits), converting to int will not work.
*/
function sumStrings(a: string, b: string): string {
  const clA = a.replace(/^0+/, '');
  const clB = b.replace(/^0+/, '');
  if (!clA) return clB;
  if (!clB) return clA;
  const result: number[] = [];
  let carry = 0;
  let iA = clA.length - 1;
  let iB = clB.length - 1;
  while (iA >= 0 || iB >= 0 || carry > 0) {
    const digitA = iA >= 0 ? parseInt(clA[iA]) : 0;
    const digitB = iB >= 0 ? parseInt(clB[iB]) : 0;
    const sum = digitA + digitB + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
    iA--; iB--;
  }
  return result.reverse().join('');
}
