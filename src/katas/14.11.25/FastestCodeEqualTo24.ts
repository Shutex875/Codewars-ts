/**
 * This is the Performance version of simple version. If your code runs more than 7000ms,
 * please optimize your code or try the simple version
 * Task
 * A game I played when I was young: Draw 4 cards from playing cards, use + - * \ and () to make the final results equal to 24.
 * You will coding in function equalTo24. Function accept 4 parameters a b c d(4 numbers), value range is 1-100.
 * The result is a string such as "2*2*2*3" ,(4+2)*(5-1); If it is not possible to calculate the 24, please return "It's not possible!"
 * All four cards are to be used, only use three or two cards are incorrect; Use a card twice or more is incorrect too.
 * You just need to return one correct solution, don't need to find out all the possibilities.
 * The different between "challenge version" and "simple version":
 * 1) a,b,c,d range:  In "challenge version" it is 1-100,
 *                    In "simple version" it is 1-13.
 * 2) "challenge version" has 1000 random testcases,
 *    "simple version" only has 20 random testcases.
 * Some examples:
 * equalTo24(1,2,3,4) //can return "(1+3)*(2+4)" or "1*2*3*4"
 * equalTo24(2,3,4,5) //can return "(5+3-2)*4" or "(3+4+5)*2"
 * equalTo24(3,4,5,6) //can return "(3-4+5)*6"
 * equalTo24(1,1,1,1) //should return "It's not possible!"
 * equalTo24(13,13,13,13) //should return "It's not possible!"
 */
function equalTo24(a: number, b: number, c: number, d: number): string {
  const nums = [a, b, c, d];
  const ops = ["+", "-", "*", "/"];
  function evaluate(a: number, b: number, op: string): number | null {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") return b !== 0 ? a / b : null;
    return null;
  }
  for (const [n1, n2, n3, n4] of permutations(nums)) {
    for (const op1 of ops) {
      for (const op2 of ops) {
        for (const op3 of ops) {
          let val: number | null;
          // ((a b) c) d
          val = evaluate(evaluate(evaluate(n1, n2, op1)!, n3, op2)!, n4, op3);
          if (val !== null && Math.abs(val - 24) < 1e-9)
            return `((${n1}${op1}${n2})${op2}${n3})${op3}${n4}`;
          // (a (b c)) d
          val = evaluate(evaluate(n1, evaluate(n2, n3, op2)!, op1)!, n4, op3);
          if (val !== null && Math.abs(val - 24) < 1e-9)
            return `(${n1}${op1}(${n2}${op2}${n3}))${op3}${n4}`;
          // a ((b c) d)
          val = evaluate(n1, evaluate(evaluate(n2, n3, op2)!, n4, op3)!, op1);
          if (val !== null && Math.abs(val - 24) < 1e-9)
            return `${n1}${op1}((${n2}${op2}${n3})${op3}${n4})`;
          // a (b (c d))
          val = evaluate(n1, evaluate(n2, evaluate(n3, n4, op3)!, op2)!, op1);
          if (val !== null && Math.abs(val - 24) < 1e-9)
            return `${n1}${op1}(${n2}${op2}(${n3}${op3}${n4}))`;
          // (a b) (c d)
          val = evaluate(evaluate(n1, n2, op1)!, evaluate(n3, n4, op3)!, op2);
          if (val !== null && Math.abs(val - 24) < 1e-9)
            return `(${n1}${op1}${n2})${op2}(${n3}${op3}${n4})`;
        }
      }
    }
  }
  return "It's not possible!";
}
function* permutations(arr: number[]): IterableIterator<number[]> {
  if (arr.length === 1) {
    yield arr;
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const p of permutations(rest)) {
      yield [arr[i], ...p];
    }
  }
}
