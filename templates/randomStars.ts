import { FormulaContext, type Volatile } from '@sheetxl/primitives';

/**
 * Returns a text string representing a random 1-to-5 star rating
 * 
 * @param totalStars The total number of stars to display (default is 5).
 * 
 * @remarks
 * Demonstrates the use of the FormulaContext to mark a results as volatile.
 */
export function randomStars(totalStars: number = 5): Volatile<string> {
  const rating = Math.floor(FormulaContext.getRandom() * totalStars) + 1;
  return '\u2605'.repeat(rating) + '\u2606'.repeat(totalStars - rating);
}