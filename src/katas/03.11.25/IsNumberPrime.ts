/**
 * Define a function that takes an integer argument and returns true or false
 * depending on if the integer is a prime number.
 * A prime number (or a prime) is a natural number greater than 1
 * that has no positive divisors other than 1 and itself.
 * Examples:
 * isPrime(1)  => false
 * isPrime(2)  => true
 * isPrime(73) => true
 * isPrime(75) => false
 * isPrime(-1) => false
 */
export function isPrime(num: number): boolean {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}
