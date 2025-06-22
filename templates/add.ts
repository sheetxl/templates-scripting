/**
 * Illustration of a simple function that adds two numbers.
 *
 * @summary Adds two numbers.
 */
export function addTwo(number1: number, number2: number): number {
  return number1 + number2;
}

/**
 * Illustration of a simple function that adds an arbitrary length of numbers.
 *
 * @summary Adds many numbers.
 */
export function addMany(...number1: number[]): number {
  return number1.reduce((acc, val) => acc + val, 0);
}