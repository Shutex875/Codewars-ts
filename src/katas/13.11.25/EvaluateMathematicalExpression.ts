/**
 * Instructions
 * Given a mathematical expression as a string you must return the result as a number.
 * Numbers
 * Number may be both whole numbers and/or decimal numbers. The same goes for the returned result.
 * Operators
 * You need to support the following mathematical operators:
 * Multiplication *
 * Division / (as floating point division)
 * Addition +
 * Subtraction -
 * Operators are always evaluated from left-to-right, and * and / must be evaluated before + and -.
 * Parentheses
 * You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6
 * Whitespace
 * There may or may not be whitespace between numbers and operators.
 * An addition to this rule is that the minus sign (-) used for negating numbers and parentheses
 * will never be separated by whitespace. I.e all of the following are valid expressions.
 * 1-1    // 0
 * 1 -1   // 0
 * 1- 1   // 0
 * 1 - 1  // 0
 * 1- -1  // 2
 * 1 - -1 // 2
 * 1--1   // 2
 * 6 + -(4)   // 2
 * 6 + -( -4) // 10
 * And the following are invalid expressions
 * 1 - - 1    // Invalid
 * 1- - 1     // Invalid
 * 6 + - (4)  // Invalid
 * 6 + -(- 4) // Invalid
 * Validation
 * You do not need to worry about validation - you will only receive valid mathematical
 * expressions following the above rules.
 * Restricted APIs
 * NOTE: Both eval and Function are disabled.
 */
const calc = function (expression: string): number {
  let index = 0;
  const expr = expression.replace(/\s/g, "");
  const length = expr.length;
  function parseExpression(): number {
    let left = parseTerm();
    while (index < length) {
      const op = expr[index];
      if (op !== "+" && op !== "-") break;
      index++;
      const right = parseTerm();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }
  function parseTerm(): number {
    let left = parseFactor();
    while (index < length) {
      const op = expr[index];
      if (op !== "*" && op !== "/") break;
      index++;
      const right = parseFactor();
      left = op === "*" ? left * right : left / right;
    }
    return left;
  }
  function parseFactor(): number {
    let sign = 1;
    if (expr[index] === "+" || expr[index] === "-") {
      if (expr[index] === "-") sign = -1;
      index++;
      while (index < length && (expr[index] === "+" || expr[index] === "-")) {
        if (expr[index] === "-") sign *= -1;
        index++;
      }
    }
    let result: number;
    if (index < length && expr[index] === "(") {
      index++;
      result = parseExpression();
      if (index < length && expr[index] === ")") {
        index++;
      }
    } else {
      let start = index;
      while (index < length && /[0-9.]/.test(expr[index])) {
        index++;
      }
      const numberStr = expr.substring(start, index);
      result = parseFloat(numberStr);
      if (isNaN(result)) {
        throw new Error(`Invalid number: ${numberStr}`);
      }
    }
    return sign * result;
  }
  const result = parseExpression();
  if (index < length) {
    throw new Error(`Unexpected character: ${expr[index]}`);
  }
  return result;
};
