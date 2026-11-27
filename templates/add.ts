import { type Flatten } from '@sheetxl/primitives';

/**
 * Adds two numbers.
 * @param number1 The first number to add.
 * @param number2 The second number to add.
 * 
 * @remarks
 * Illustration of a simple function that adds two numbers.
 */
export function addTwo(number1: number, number2: number): number {
  return number1 + number2;
}

/**
 * Illustration of a simple function that adds an arbitrary length of numbers.
 *
 * @summary Adds many numbers.
 * @param number1 The numbers to add.
 */
export function addMany(...number1: number[]): number {
  return number1.reduce((acc, val) => acc + val, 0);
}

/**
 * Illustration of a function that takes a range: an array of rows, each an array of values.
 *
 * @summary Adds the numbers of a range.
 * @param values The cells to add.
 */
export function addRange(values: Flatten<number[]>): number {
  return values.reduce((acc, row) => acc + row.reduce((sum, val) => sum + val, 0), 0);
}
