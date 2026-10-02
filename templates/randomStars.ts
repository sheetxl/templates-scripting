import { FormulaContext } from '@sheetxl/primitives';

/**
 * Returns a text string representing a random 1-to-5 star rating
 * 
 * @param totalStars The total number of stars to display (default is 5).
 * 
 * @remarks
 * Demonstrates the use of the FormulaContext to mark a results as volatile.
 */
export function randomStars(totalStars: number=5): string {
  // --- Mark function as volatile ---
  // Ensure the function is called on the next calculation cycle.
  FormulaContext.markVolatile();

  // 1. Generate a random integer between 1 and totalStars (inclusive)
  const rating = Math.floor(Math.random() * totalStars) + 1;

  // 2. Define the star characters
  const filledStar = "\u2605"; // Unicode character for ★
  const outlineStar = "\u2606"; // Unicode character for ☆

  // 3. Construct the result string based on the rating
  const filledCount = rating;
  const outlineCount = totalStars - rating;

  // 4. Create and return the string
  return filledStar.repeat(filledCount) + outlineStar.repeat(outlineCount);
};