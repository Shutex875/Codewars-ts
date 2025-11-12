/**
 * This time we want to write calculations using functions and get the results. Let's have a look at some examples:
 * seven(times(five()));     must return 35
 * four(plus(nine()));       must return 13
 * eight(minus(three()));    must return 5
 * six(dividedBy(two()));    must return 3
 * Requirements:
 * There must be a function for each number from 0 ("zero") to 9 ("nine")
 * There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy
 * Each calculation consist of exactly one operation and two numbers
 * The most outer function represents the left operand, the most inner function represents the right operand
 * Division should be integer division. For example, this should return 2, not 2.666666...:
 * eight(dividedBy(three()));
 */
type Operation = (num: number) => number;
function zero(operation?: Operation): number {
  return operation ? operation(0) : 0;
}
function one(operation?: Operation): number {
  return operation ? operation(1) : 1;
}
function two(operation?: Operation): number {
  return operation ? operation(2) : 2;
}
function three(operation?: Operation): number {
  return operation ? operation(3) : 3;
}
function four(operation?: Operation): number {
  return operation ? operation(4) : 4;
}
function five(operation?: Operation): number {
  return operation ? operation(5) : 5;
}
function six(operation?: Operation): number {
  return operation ? operation(6) : 6;
}
function seven(operation?: Operation): number {
  return operation ? operation(7) : 7;
}
function eight(operation?: Operation): number {
  return operation ? operation(8) : 8;
}
function nine(operation?: Operation): number {
  return operation ? operation(9) : 9;
}

function plus(rightOperand: number): Operation {
  return (leftOperand: number) => leftOperand + rightOperand;
}
function minus(rightOperand: number): Operation {
  return (leftOperand: number) => leftOperand - rightOperand;
}
function times(rightOperand: number): Operation {
  return (leftOperand: number) => leftOperand * rightOperand;
}
function dividedBy(rightOperand: number): Operation {
  return (leftOperand: number) => Math.floor(leftOperand / rightOperand);
}
